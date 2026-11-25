function execute(url) {
    url = decodeURIComponent(url);
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let content = '<div class="chapter-content">';
        doc.select(".reading-content .inner img.lazy").forEach(e => {
            let src = e.attr("data-src");
            if (!src) src = e.attr("src");
            if (src) {
                content += '<img src="' + src + '" />';
            }
        });
        content += '</div>';
        return Response.success(content);
    }
    return null;
}
