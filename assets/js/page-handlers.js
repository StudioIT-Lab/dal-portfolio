import { handleScrollListener } from "./scroll.js";
import { pageOverview } from "./page-overview.js";
async function pageInit() {
    let pageType = '';
    let path = window.location.pathname;
    const bg = document.querySelector('#background');
    if (!bg)
        return;
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (path.startsWith('/'))
        path = path.slice(1);
    let segments = path.split('/');
    const parent = segments[0];
    switch (parent) {
        case '':
            handleScrollListener(); // attach scroll logic
            break;
        case 'photography':
            bg.dataset.bgDesign = '2';
            pageType = 'project';
            break;
        case 'programming':
            bg.dataset.bgDesign = '3';
            pageType = 'project';
            break;
        case 'design':
            bg.dataset.bgDesign = '4';
            pageType = 'project';
            break;
        default:
            bg.dataset.bgDesign = '-2';
            return;
    }
    const slug = segments[1];
    if (slug) {
        if (pageType === 'project' && await pageOverview.check.project(slug)) {
            await pageOverview.load.project(slug);
        }
        else if (pageType === 'project') {
            bg.dataset.bgDesign = '-2';
        }
    }
    else if (pageType === 'project') {
        pageOverview.load.overview(parent);
    }
}
export { pageInit };
