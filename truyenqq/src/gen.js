load('config.js');
function execute(url, page) {
    if (!page) page = '1';

    let currentPage = parseInt(page);
    let requestUrl = url;
    if (currentPage > 1) {
        requestUrl = url + '?page=' + currentPage;
    }

    let response = fetch(requestUrl);
    if (!response.ok) return null;

    let text = response.text('utf-8');
    if (!text) return null;
    let doc = Html.parse(text);

    let data = [];
    let items = doc.select('.listing .inner .item');

    items.forEach(e => {
        let linkEl = e.select('.cover a').first();
        let titleEl = e.select('h3 a').first();
        if (!titleEl) titleEl = e.select('.info h3.name a').first();
        let coverEl = e.select('img').first();
        if (!linkEl || !titleEl) return;
        let cover = coverEl ? coverEl.attr('src') : '';
        if (cover && !cover.startsWith('http')) cover = BASE_URL + cover;

        let chapText = '';
        let lastLine = e.select('.info .line').last();
        if (lastLine) chapText = lastLine.text();

        data.push({
            name: titleEl.text(),
            link: BASE_URL + encodeURIComponent(linkEl.attr('href')).replace('%2F', '/'),
            cover: cover,
            host: BASE_URL,
            description: chapText,
        });
    });

    let next = '';
    let nextPage = currentPage + 1;
    let btns = doc.select('.pagination .btn-page');
    btns.forEach(b => {
        let href = b.attr('href');
        if (href && href.indexOf('?page=' + nextPage) >= 0) {
            next = nextPage.toString();
        }
    });

    return Response.success(data, next);
}
