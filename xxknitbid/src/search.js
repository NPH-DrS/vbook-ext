load('config.js');
load('filter.js');
function execute(key, page) {
    if (!page) page = "1";
    let url = BASE_URL + "/en/search/?s=" + key;
    if (page != "1") {
        url = BASE_URL + "/en/search/page/" + page + "/?s=" + key;
    }
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select("article.excerpt").forEach(e => {
            let name = e.select("h2 a").text().trim();
            if (isFiltered(name)) return;
            let cover = e.select(".imgbox-img").attr("data-original-src");
            if (cover && cover.startsWith("/")) cover = BASE_URL + cover;
            let link = e.select("h2 a").attr("href");
            if (link && link.startsWith("/")) link = BASE_URL + link;
            if (link && cover) link += "?cover=" + encodeURIComponent(cover);
            data.push({
                name: name,
                link: link,
                cover: cover,
                host: BASE_URL
            });
        });
        let next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}
