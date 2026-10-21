load('config.js');

function getTotalPages(doc) {
    let total = 1;

    let max = doc.select(".pagination .jump-input").attr("max");
    if (max) {
        let n = parseInt(max);
        if (n > 1) total = n;
    }

    doc.select(".pagination a[data-page]").forEach(a => {
        let n = parseInt(a.attr("data-page"));
        if (n > total) total = n;
    });

    return total;
}

function execute(url) {
    if (url.indexOf("?cover=") >= 0) url = url.split("?cover=")[0];

    let baseUrl = url.replace(/\/+$/, "");
    let response = fetch(baseUrl + "/");
    if (!response || !response.ok) {
        return Response.success([
            {name: "Album", url: baseUrl + "/", host: BASE_URL}
        ]);
    }

    let doc = response.html();
    let total = doc ? getTotalPages(doc) : 1;

    let data = [];
    for (let i = 1; i <= total; i++) {
        data.push({
            name: total > 1 ? "Trang " + i + "/" + total : "Album",
            url: i === 1 ? baseUrl + "/" : baseUrl + "/page/" + i + "/",
            host: BASE_URL
        });
    }

    return Response.success(data);
}
