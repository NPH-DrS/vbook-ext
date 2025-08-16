load('config.js');
function execute() {
    return Response.success([
        {
            title: "Home",
            input: BASE_URL + "/list?",
            script: "gen.js"
        },
        {
            title: "Newest",
            input: BASE_URL + "/list?sort=-created_at&",
            script: "gen.js"
        },
        {
            title: "Popular",
            input: BASE_URL + "/list?sort=-views&",
            script: "gen.js"
        },
        {
            title: "Oldest",
            input: BASE_URL + "/list?sort=created_at&",
            script: "gen.js"
        },
        {
            title: "A-Z",
            input: BASE_URL + "/list?sort=name&",
            script: "gen.js"
        },
        {
            title: "Z-A",
            input: BASE_URL + "/list?sort=-name&",
            script: "gen.js"
        }
    ]);
}