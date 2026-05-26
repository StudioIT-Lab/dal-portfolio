async function checkProject(slug: string) {
    return true;

}

async function loadProject(slug: string) {

}

async function loadOverview(slug: string) {

}

function newCrojectCard(image: string, title: string, date: string, link: string) {
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