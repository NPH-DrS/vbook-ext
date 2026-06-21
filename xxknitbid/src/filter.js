const FILTER_KEYWORDS = [
    "AI Generated",
    "AI Beauty",
    "AI Porn",
    "AI Chinese",
    "Anime Fanart",
];

function isFiltered(name) {
    return FILTER_KEYWORDS.some(kw => name.toLowerCase().includes(kw.toLowerCase()));
}
