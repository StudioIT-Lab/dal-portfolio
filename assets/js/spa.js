import { loadEmojis } from "./emoji.js";
import { pageInit } from "./page-handlers.js";


async function loadPage(path, scrollY = 0) {
    if (path === '/') path = '/index';

    console.log(`loading '${path}'`);

    try {
        const res = await fetch(`/pages${path}.html`);
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
        pageInit();
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