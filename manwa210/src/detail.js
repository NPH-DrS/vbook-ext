load('config.js');
function execute(url) {

    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        var style = doc.select(".cover").attr("style")
        return Response.success({
            name: doc.select("span.grow.text-lg").first().text(),
            cover: style.substring(style.indexOf("https"), style.indexOf("')"))
        });
    }
    return null;
}