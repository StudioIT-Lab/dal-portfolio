import { loadEmojis } from "./emoji.js";
import { pageInit } from "./page-handlers.js";
import { checkProject } from "./projectmanagement.js";


async function parseUrlToFile(path) {
    let file = '404';
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    if (path.startsWith('/')) path = path.slice(1);

    let segments = path.split('/');
    if (segments.length == 1) {
        switch (segments[0]) {
            case '':
                file = 'index';
                break;
            case 'photography':
            case 'programming':
            case 'design':
                file = 'projects';
                break;
            default:
                file = '404';
                return;
        }
    }

    if (segments.length > 1) {
        switch (segments[0]) {
            case 'photography':
            case 'programming':
            case 'design':
                file = await checkProject(segments[1]) ? 'projectdetail' : '404';
                break;
            default:
                file = '404';
                break;
        }
    }

    return file;

}


async function loadPage(path, scrollY = 0) {
    let file = await parseUrlToFile(path);


    console.log(`loading '${file}'`);

    try {
        const res = await fetch(`/pages/${file}.html`);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();
        app.innerHTML = html;

        // restore scroll
        window.scrollTo(0, scrollY);

        // run per-page behaviors

    } catch {

        const res404 = await fetch('/pages/404.html');
        app.innerHTML = res404.ok ? await res404.text() : '<h1>404 Not Found</h1>';
        window.scrollTo(0, 0);
    }

    try {
        loadEmojis();
        await pageInit();
    } catch (error) {
        console.warn(error);
    }
}

function navigateTo(url) {
    const currentState = history.state || {};
    currentState.scrollY = window.scrollY;
    history.replaceState(currentState, null, window.location.pathname);

    history.pushState({ scrollY: 0 }, null, url);
    loadPage(window.location.pathname, 0);
}

// handle links
document.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigateTo(new URL(e.target.href).pathname);
    }
});

window.addEventListener('popstate', (event) => {
    const scrollY = event.state?.scrollY || 0;
    loadPage(window.location.pathname, scrollY);
});


export { loadPage };

window.navigateTo = navigateTo;