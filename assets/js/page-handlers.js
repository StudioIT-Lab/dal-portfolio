import { handleScrollListener } from "./scroll.js";

function pageInit() {
    const pageId = document.querySelector('.page')?.id;

    switch (pageId) {
        case 'page-index':
            handleScrollListener(); // attach scroll logic
            break;
        case 'page-photography':
            document.querySelector('#background').dataset.bgDesign = 2;
            break;
        case 'page-programming':
            document.querySelector('#background').dataset.bgDesign = 3;
            break;
        case 'page-design':
            document.querySelector('#background').dataset.bgDesign = 4;
            break;
        case 'page-error':
            document.querySelector('#background').dataset.bgDesign = -2;
            break;
        default:
            break;
    }
}

export { pageInit };