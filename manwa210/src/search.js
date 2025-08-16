load('config.js');
function execute(key, page) {
    if (!page) page = "1";

    let response = fetch(BASE_URL + `/search?filter%5Bname%5D=${key}&page=${page}`, {
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
                cover: style.substring(style.indexOf("url") + 5, style.indexOf("')"))
            })
        });


        var nextInt = parseInt(page);
        nextInt++;
        var next = nextInt.toString();

        return Response.success(data, next);
    }

    return null;
}