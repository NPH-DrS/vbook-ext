load('config.js');

function fixUrl(src) {
    if (!src) return null;
    if (src.startsWith("/")) src = BASE_URL + src;
    if (src.indexOf("format=") >= 0) return src;
    return src + (src.indexOf("?") >= 0 ? "&" : "?") + "format=jpeg";
}

function collectHtml(doc) {
    let imgs = [];
    doc.select(".item-image img").forEach(img => {
        let src = fixUrl(img.attr("data-src") || img.attr("src"));
        if (src) imgs.push(src);
    });
    return imgs;
}

function collectJsonLd(doc) {
    let imgs = [];
    doc.select("script[type='application/ld+json']").forEach(script => {
        try {
            let json = JSON.parse(script.text());
            if (json['@type'] === 'ImageGallery') {
                let list = (json.mainEntity && json.mainEntity.itemListElement) || json.itemListElement || [];
                list.forEach(item => {
                    let u = fixUrl((item.item && item.item.contentUrl) || item.contentUrl);
                    if (u) imgs.push(u);
                });
            }
        } catch (e) {}
    });
    return imgs;
}

function execute(url) {
    if (url.indexOf("?cover=") >= 0) url = url.split("?cover=")[0];

    let response = fetch(url);
    if (!response || !response.ok) return Response.success([]);

    let doc = response.html();
    if (!doc) return Response.success([]);

    let imgs = collectHtml(doc);
    if (imgs.length === 0) imgs = collectJsonLd(doc);

    return Response.success(imgs);
}
