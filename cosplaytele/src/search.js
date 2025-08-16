load('config.js');
function execute(key, page) {
    if (!page) page = "0";

    let response = fetch(BASE_URL + `page/${page}/?s=${key}`, {
        method : "GET"
    });

    if (response.ok) {
        let doc = response.html();
        let data = [];
        doc.select("#post-list .col.post-item").forEach(e => {
            let name = e.select(".box-text-inner .post-title a").text().trim();
            let link = e.select(".box-text-inner .post-title a").attr("href");
            var cover = e.select(".box-image img").attr("src");

            if(cover == ""){
                let response2 = fetch(link, {
                    method : "GET"
                });
                
                if(response2.ok){
                    cover = response2.html().select(".gallery .gallery-item img").attr("src");
                }
            }

            data.push({
                name,
                link,
                cover,
                host: BASE_URL
            })
        });

        let next = (parseInt(page) + 1).toString();
        return Response.success(data, next);
    }
    return null;
}

