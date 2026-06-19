function execute() {
    return Response.success([
        {title: "Trang chủ", input: "", script: "gen.js"},
        {title: "Cosplay video", input: "category/video-cosplayy/", script: "gen.js"},
    ]);
}