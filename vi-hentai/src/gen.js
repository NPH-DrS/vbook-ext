load('config.js');
function execute(url, page) {
    if (!page) page = 1;

    let response = fetch(url + `page=${page}`, {
        method: "GET"
    })

    if (response.ok) {
        let doc = response.html();
        let data = [];

        doc.select(".manga-vertical").forEach(e => {
            var style = e.select(".cover").attr("style")
            data.push({
                name: e.select(".p-2 a").text().trim(),
                link: BASE_URL + e.select(".p-2 a").attr("href"),
                description: e.select(".relative .latest-chapter").text(),
                cover: style.substring(style.indexOf("https"), style.indexOf("')"))
            })
        });

        return Response.success(data, ++page);
    }

    return null
}