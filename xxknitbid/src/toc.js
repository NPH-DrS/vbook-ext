load('config.js');
function execute(url) {
    return Response.success([
        {name: "Album", url: url, host: BASE_URL},
    ]);
}
