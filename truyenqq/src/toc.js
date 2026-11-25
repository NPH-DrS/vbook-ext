function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    let doc = response.html();

    let data = [];
    doc.select(".chapter-list .reading-list .item").forEach(e => {
        let a = e.select(".chapter-name").first();
        if (!a) return;
        data.push({
            name: a.text(),
            url: encodeURIComponent(a.attr("href")).replace(/%2F/g, "/"),
            host: BASE_URL,
        });
    });

    return Response.success(data);
}
