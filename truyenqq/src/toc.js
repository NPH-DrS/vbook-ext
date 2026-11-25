load('config.js');
function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    let doc = response.html();

    let data = [];
    doc.select(".chapter-list .inner .item").forEach(e => {
        let a = e.select(".item-name a").first();
        if (!a) return;
        data.push({
            name: a.text(),
            url: encodeURIComponent(a.attr("href")).replace(/%2F/g, "/"),
            host: BASE_URL,
        });
    });

    data.reverse();
    return Response.success(data);
}
