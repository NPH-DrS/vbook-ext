const FILTER_KEYWORDS = [
    " AI ",
    "AI ",
    "AI-",
];

function isFiltered(name) {
    return FILTER_KEYWORDS.some(kw => name.toLowerCase().includes(kw.toLowerCase()));
}
