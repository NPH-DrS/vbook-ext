load('config.js');
function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();

        let author = '';
        doc.select(".book-meta .line").forEach(e => {
            let title = e.select(".title").text().trim();
            if (title === "Tác giả:") {
                author = e.select(".result span").first().text();
            }
        });

        let ongoing = doc.select(".label-status.label-updating").size() > 0;

        let genres = [];
        doc.select(".book-meta .line").forEach(e => {
            let title = e.select(".title").text().trim();
            if (title === "Thể loại:") {
                e.select(".result a").forEach(a => {
                    genres.push({
                        title: a.text(),
                        input: BASE_URL + encodeURIComponent(a.attr("href")).replace("%2F", "/"),
                        script: "gen.js",
                    });
                });
            }
        });

        return Response.success({
            name: doc.select("h1[itemprop='name']").text(),
            cover: BASE_URL + doc.select(".poster img[itemprop='image']").first().attr("src"),
            author: author,
            description: doc.select("div[itemprop='description']").html(),
            host: BASE_URL,
            ongoing: ongoing,
            genres: genres,
        });
    }
    return null;
}
