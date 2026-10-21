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
    let data = [];

    if (url.indexOf("?cover=") >= 0) url = url.split("?cover=")[0];

    let baseUrl = url.replace(/\/+$/, "");
    let pageUrl = baseUrl + "/";
    let page = 1;
    let guard = 0;

    while (pageUrl && guard < 200) {
        guard++;

        let response = fetch(pageUrl);
        if (!response || !response.ok) break;
        let doc = response.html();
        if (!doc) break;

        let imgs = collectHtml(doc);
        if (imgs.length === 0) imgs = collectJsonLd(doc);
        if (imgs.length === 0) break;

        data = data.concat(imgs);

        let nextUrl = doc.select("link[rel='next']").attr("href");
        if (!nextUrl) {
            let nextPage = doc.select(".pagination .next-page a").attr("data-page");
            if (nextPage && Number(nextPage) > page) {
                nextUrl = baseUrl + "/page/" + nextPage + "/";
            }
        }
        if (!nextUrl) break;

        page++;
        pageUrl = nextUrl;
    }

    return Response.success(data);
}
