import { loadEmojis } from "./emoji.js";
import { pageInit } from "./page-handlers.js";
import { checkProject } from "./projectmanagement.js";


async function parseUrlToFile(path) { let file = '404'; if (path.endsWith('/')) { path = path.slice(0, -1); } if (path.startsWith('/')) path = path.slice(1); let segments = path.split('/'); if (segments.length == 1) { switch (segments[0]) { case '': file = 'index'; break; case 'photography': case 'programming': case 'design': file = 'projects'; break; default: file = '404'; return; } } if (segments.length > 1) { switch (segments[0]) { case 'photography': case 'programming': case 'design': file = await checkProject(segments[1]) ? 'projectdetail' : '404'; break; default: file = '404'; break; } } return file; }


async function loadPage(path, animation = 'fadeinleft', scrollY = 0, initialLoad = false) {
    if (path.endsWith('/')) path = path.slice(0, -1);

    let appContainer = document.querySelector('#app');

    let file = await parseUrlToFile(path);


    console.log(`loading '${file}'`);

    if (!initialLoad) {
        let exitAnimation;
        switch (animation) {
            case 'fadeinleft':
                exitAnimation = 'fadeoutright';
                break;

            case 'fadeinright':
                exitAnimation = 'fadeoutleft';
                break;

            default:

                exitAnimation = 'fadeoutleft';
                break;
        }
        appContainer.setAttribute('data-animation', exitAnimation);
        await new Promise(r => setTimeout(r, 710));
    }
    else {
        animation = 'fadeinup';
    }




    try {
        const res = await fetch(`/pages/${file}.html`);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();
        appContainer.innerHTML = html;

        appContainer.setAttribute('data-animation', animation);
        updateCanonical(`https://damian-luginbuehl.ch${path}`);

        /**  restore scroll*/
        window.scrollTo(0, scrollY);


    } catch {

        const res404 = await fetch('/pages/404.html');
        app.innerHTML = res404.ok ? await res404.text() : '<h1>404 Not Found</h1>';

        appContainer.setAttribute('data-animation', 'fadeinleft');
        window.scrollTo(0, 0);

        updateCanonical(``);
    }

    try {
        loadEmojis();
        await pageInit();
    } catch (error) {
        console.warn(error);
    }
}

function navigateTo(url) {
    let path = window.location.pathname;
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (!url.startsWith('/')) {
        path = `${path}/${url}`;
    }
    else {
        path = url;
    }
    const current = history.state || {};
    history.replaceState({ ...current, scrollY: window.scrollY, idx: window._historyIdx }, null, window.location.pathname);

    const nextIdx = (window._historyIdx ?? 0) + 1;
    history.pushState({ idx: nextIdx, scrollY: 0 }, null, path);
    window._historyIdx = nextIdx;
    loadPage(window.location.pathname, 'fadeinright', 0);
}

/**  handle links*/
document.addEventListener('click', (e) => {

    if (e.target.tagName == 'A' && e.target.hasAttribute('data-link')) {
        e.preventDefault();
        navigateTo(e.target.getAttribute('data-link'));
        return;
    }
});


window.addEventListener('popstate', (event) => {
    const newIdx = event.state?.idx;
    const scrollY = event.state?.scrollY || 0;

    let direction = 'unknown';
    if (typeof newIdx === 'number' && typeof window._historyIdx === 'number') {
        direction = newIdx > window._historyIdx ? 'forward' : 'back';
        window._historyIdx = newIdx;
    }

    loadPage(window.location.pathname, direction === 'forward' ? 'fadeinright' : 'fadeinleft', scrollY);
});


function updateCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
}




export { loadPage, updateCanonical };

window.navigateTo = navigateTo;

if (!history.state || typeof history.state.idx !== 'number') {
    const base = { ...(history.state || {}), idx: 0, scrollY: window.scrollY || 0 };
    history.replaceState(base, null, window.location.pathname);
}
window._historyIdx = history.state.idx;