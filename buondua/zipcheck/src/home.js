function execute() {
    return Response.success([
        {title: "Trang chủ", input: "https://buondua.com/", script: "gen.js"},
         {title: "Hot", input: "https://buondua.com/hot/", script: "gen.js"},
    ]);
}