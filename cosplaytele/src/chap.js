function execute(url) {
    let response = fetch(url);

    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select(".gallery .gallery-item img").forEach(image => {
            data.push(image.attr("src"));
        });


        return Response.success(data);
    }

    return null;
}