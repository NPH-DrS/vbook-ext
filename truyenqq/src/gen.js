load('config.js');
function execute(url, page) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".daily-update .inner .item").forEach(e => {
            let linkEl = e.select(".cover a").first();
            let titleEl = e.select(".info h3.name a").first();
            let coverEl = e.select(".cover img").first();
            let chapEl = e.select(".latest .chap a.chapter-name").first();
            if (!linkEl || !titleEl) return;
            data.push({
                name: titleEl.text(),
                link: BASE_URL + encodeURIComponent(linkEl.attr("href")).replace("%2F", "/"),
                cover: BASE_URL + coverEl.attr("src"),
                host: BASE_URL,
                description: chapEl ? chapEl.text() : "",
            })
        });
        return Response.success(data, "");
    }
    return null;
}
