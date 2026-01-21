import { loadPage } from "./spa.js";

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function initPage() {



    const path = window.location.pathname;


    loadPage(path, 'fadeinleft', 0, true);

}


initPage();