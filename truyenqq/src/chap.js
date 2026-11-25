function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    if (!response.ok) return null;

    let doc = response.html();
    let data = [];
    doc.select(".reading-content .inner img.lazy").forEach(e => {
        let src = e.attr("data-src");
        if (!src) return;
        data.push(src);
    });

    return Response.success(data);
}
