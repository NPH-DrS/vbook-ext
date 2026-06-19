load('config.js');
function execute(url, page) {
    if (!page) page = "1";
    let response = fetch(BASE_URL + url + (page == "1" ? "" : "page/" + page + "/"));
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select("article.excerpt").forEach(e => {
            let cover = e.select(".imgbox-img").attr("data-original-src");
            if (cover && cover.startsWith("/")) cover = "https://xx.knit.bid" + cover;
            let link = e.select("h2 a").attr("href");
            if (link && link.startsWith("/")) link = "https://xx.knit.bid" + link;
            if (link && cover) link += "?cover=" + encodeURIComponent(cover);
            data.push({
                name: e.select("h2 a").text().trim(),
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
