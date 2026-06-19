load('config.js');
function execute(url) {
    let coverUrl = "";
    if (url.includes("?cover=")) {
        let parts = url.split("?cover=");
        url = parts[0];
        coverUrl = decodeURIComponent(parts[1]);
    }
    let doc = fetch(url).html();
    let genres = [];
    doc.select(".article-tags a").forEach(e => {
        genres.push({
            title: e.text(),
            input: e.attr("href").replace("/vi/", ""),
            script: "gen.js"
        });
    });
    return Response.success({
        name: doc.select("h1.focusbox-title").text(),
        cover: coverUrl || doc.select("meta[property='og:image']").attr("content"),
        description: doc.select("meta[property='og:description']").attr("content"),
        genres: genres,
        host: BASE_URL,
    });
}
