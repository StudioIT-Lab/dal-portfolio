import { loadPage } from "./spa.js";

function initPage() {
    const path = window.location.pathname;


    loadPage(path);

}


initPage();