function execute() {
    return Response.success([
        {title: "Home", input: "en/", script: "gen.js"},
        {title: "Latest", input: "en/sort/new/", script: "gen.js"},
        {title: "Monthly", input: "en/rankings/monthly/", script: "gen.js"},
        {title: "Chunmomo - 蠢沫沫", input: "en/tag/400/", script: "gen.js"},
    ]);
}
