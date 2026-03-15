async function checkProject(slug) {
    return true;

}

async function loadProject(slug) {

}

async function loadOverview(slug) {

}

function newCrojectCard(image, title, date, link) {
    const projectcard = document.createElement('a');
    projectcard.classList.add('projectcard');
    projectcard.href = link;
    projectcard.setAttribute('data-link', link);

    const projectteaser = document.createElement('img');
    projectteaser.classList.add('projectteaser');
    projectteaser.src = image;

    projectcard.appendChild(projectteaser);

    const projecttitle = document.createElement('h2');
    projecttitle.classList.add('projecttitle');
    projecttitle.textContent = title;

    projectcard.appendChild(projecttitle);

    const projectyear = document.createElement('p');
    projectyear.classList.add('projectyear');
    projectyear.textContent = date;

    projectcard.appendChild(projectyear);

    return projectcard;
}

export { loadProject, checkProject, loadOverview };