const APIURL = 'https://api.ctx.damian-luginbuehl.ch/v1/';

type ProjectOverviewItem = {
    thumbnail_url: string;
    title: string;
    date_created: string;
    slug: string;
};

type OverviewResponse = ProjectOverviewItem[] | undefined;

const API = {
    fetch: {

        overview: async function (category: string): Promise<OverviewResponse> {
            const request = await globalThis.fetch(`${APIURL}content/portfolio?portfolio=dal-main&category=${category}`, {
                method: "GET"
            });

            if (request.status == 404) {
                return;
            }
            const response = await request.json() as OverviewResponse;

            return response;
        }
    }
};

export { API };
export type { ProjectOverviewItem, OverviewResponse };