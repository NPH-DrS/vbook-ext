function execute(url) {
    let data = [];

    if (url.includes("?cover=")) url = url.split("?cover=")[0];

    let baseUrl = url.replace(/\/$/, "");
    let page = 1;

    while (true) {
        let pageUrl = page === 1 ? baseUrl + "/" : baseUrl + "/page/" + page + "/";
        let imgs = [];

        if (page > 1) {
            let ajaxResponse = fetch(pageUrl + "?ajax=1");
            if (ajaxResponse.ok) {
                let ajaxJson = ajaxResponse.json();
                if (ajaxJson && ajaxJson.html) {
                    let htmlDoc = Html.parse(ajaxJson.html);
                    htmlDoc.select(".item-image img").forEach(img => {
                        let src = img.attr("data-src");
                        if (src) {
                            if (src.startsWith("/")) src = "https://xx.knit.bid" + src;
                            imgs.push(src + "?format=jpeg");
                        }
                    });
                    data = data.concat(imgs);
                    if (ajaxJson.pagination && ajaxJson.pagination.has_next) { page++; continue; }
                    break;
                }
            }
        }

        let response = fetch(pageUrl);
        if (!response.ok) break;
        let doc = response.html();

        let found = false;
        doc.select("script[type='application/ld+json']").forEach(script => {
            try {
                let json = JSON.parse(script.text());
                if (json['@type'] === 'ImageGallery' && json.itemListElement) {
                    json.itemListElement.forEach(item => {
                        if (item.contentUrl) imgs.push(item.contentUrl + "?format=jpeg");
                    });
                    found = true;
                }
            } catch (e) {}
        });

        if (!found) {
            doc.select(".item-image img").forEach(img => {
                let src = img.attr("data-src");
                if (src) {
                    if (src.startsWith("/")) src = "https://xx.knit.bid" + src;
                    imgs.push(src + "?format=jpeg");
                }
            });
        }

        data = data.concat(imgs);
        let nextLink = doc.select("link[rel='next']").attr("href");
        if (!nextLink) break;
        page++;
    }

    return Response.success(data);
}
