function execute() {
    return Response.success([
        {title: "Trang chủ", input: "", script: "gen.js"},
        {title: "Mới nhất", input: "sort/new/", script: "gen.js"},
        {title: "Phổ biến", input: "sort/hot/", script: "gen.js"},
        {title: "Hôm nay nóng", input: "rankings/daily/", script: "gen.js"},
        {title: "3 ngày nóng", input: "rankings/3days/", script: "gen.js"},
        {title: "Tuần nóng", input: "rankings/weekly/", script: "gen.js"},
        {title: "Tháng nóng", input: "rankings/monthly/", script: "gen.js"},
    ]);
}
