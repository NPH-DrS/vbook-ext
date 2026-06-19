function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    let doc = response.html();

    let paginationList = doc.select(".pagination-list").first();

    let data = [];

    if (paginationList) {
        let el = paginationList.select("a.pagination-link");

        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);

            data.push({
                name: e.text().trim(),
                url: encodeURIComponent(e.attr("href")).replace(/%2F/g, "/"),
                host: "https://buondua.com"
            });
        }
    }

    return Response.success(data);
}