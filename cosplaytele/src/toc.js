// mục lục 
load('config.js');
function execute(url) {
    return Response.success([
           {name: "One-shot", url,  host: BASE_URL},
    ]);
}