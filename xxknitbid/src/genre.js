load('config.js');
function execute() {
    let data = [];

    let response = fetch(BASE_URL + "en/tag/");
    if (response.ok) {
        let doc = response.html();
        doc.select("div.tagslist ul li a.name").forEach(e => {
            let title = e.text().trim();
            title = title.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
            data.push({
                title: title,
                input: e.attr("href").replace(/^\//, ""),
                script: "gen.js"
            });
        });
        data.sort((a, b) => a.title.localeCompare(b.title));
    }

    return Response.success(data);
}
