import { API } from "./api.js";
const pageOverview = {
    initialize: async function () {
    },
    unload: async function () {
    },
    check: {
        project: async function (slug) {
            return true;
        }
    },
    load: {
        project: async function (slug) {
        },
        overview: async function (parent) {
            console.log(parent);
            const projects = await API.fetch.overview(parent);
            console.log(projects);
            const main = document.querySelector('main');
            projects?.forEach((project) => {
                main?.appendChild(pageOverview.new.projectCard(project.thumbnail_url, project.title, (project.date_created).slice(0, 4), `/${parent}/${project.slug}`));
            });
            console.log(main);
        }
    },
    new: {
        projectCard: function (image, title, date, link) {
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
    }
};
export { pageOverview };
