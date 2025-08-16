load('config.js');
function execute(url) {

    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        var imgs = [];
        doc.select("div.text-center img").forEach(e => {
            imgs.push(e.attr('src'))
        })
        return Response.success(imgs);
    }
    return null;
}