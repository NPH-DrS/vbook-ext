load('config.js');
function execute() {

    let response = fetch(BASE_URL + "/#", {
        method: "GET"
    });

    const data = [];

    if (response.ok) {
        let doc = response.html();
        doc.select("ul.absolute a").forEach(e => {
            data.push({
                title: e.select("li span").text().trim(),
                input: BASE_URL + "/" + e.attr("href").slice(1) + "?",
                script: "gen.js"
            });
        });
    }

    return Response.success(data);
}