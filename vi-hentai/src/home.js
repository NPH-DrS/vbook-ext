load('config.js');
function execute() {
    return Response.success([
        {
            title: "Trang chủ",
            input: BASE_URL + "/danh-sach?",
            script: "gen.js"
        },
        {
            title: "Truyện mới",
            input: BASE_URL + "/danh-sach?sort=-created_at&",
            script: "gen.js"
        },
        {
            title: "Xem nhiều",
            input: BASE_URL + "/danh-sach?sort=-views&",
            script: "gen.js"
        },
        {
            title: "Truyện cũ",
            input: BASE_URL + "/danh-sach?sort=created_at&",
            script: "gen.js"
        },
        {
            title: "A-Z",
            input: BASE_URL + "/danh-sach?sort=name&",
            script: "gen.js"
        },
        {
            title: "Z-A",
            input: BASE_URL + "/danh-sach?sort=-name&",
            script: "gen.js"
        }
    ]);
}