load('config.js');
function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var data = [];
        var allchap = doc.select("ul.overflow-x-hidden a")
        for (var i = allchap.size() - 1; i >= 0; i--) {
            var e = allchap.get(i)
            data.push({
                name: e.select("span").first().text(),
                url: BASE_URL + e.attr("href")
            });
        }
        return Response.success(data);
    }
    return null;
}