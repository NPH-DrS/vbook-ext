load('config.js');
function execute(key, page) {
    if(!page) page = '0';
    let response = fetch(BASE_URL+'/?search='+key, {
        method: "GET",
        queries: {
            start: page
        }
    });
    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".blog.columns > .items-row.column").forEach(e => {
            data.push({
                name: e.select(".item-thumb img").attr("alt"),
                link: BASE_URL +  encodeURIComponent(e.select(".page-header a").first().attr("href")).replace("%2F","/") ,
                cover: e.select(".item-thumb img").attr("src"),
                host: BASE_URL
            })
        });
        return Response.success(data);
    }
    return null;
}