load('config.js');
function execute() {
    return Response.success([
        {title: "Truyện mới cập nhật", input: BASE_URL + "/", script: "gen.js"},
        {title: "Truyện phổ biến", input: BASE_URL + "/truyen-hot/", script: "gen.js"},
    ]);
}
