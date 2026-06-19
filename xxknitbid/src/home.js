function execute() {
    return Response.success([
        {title: "Home", input: "en/", script: "gen.js"},
        {title: "Latest", input: "en/sort/new/", script: "gen.js"},
        {title: "Monthly (EN)", input: "en/rankings/monthly/", script: "gen.js"},
        {title: "Monthly (VI)", input: "vi/rankings/monthly/", script: "gen.js"},
        {title: "Monthly (JA)", input: "ja/rankings/monthly/", script: "gen.js"},
        {title: "Monthly (KO)", input: "ko/rankings/monthly/", script: "gen.js"},
        {title: "Monthly (CN)", input: "rankings/monthly/", script: "gen.js"},
    ]);
}
