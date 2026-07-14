const APIURL = 'https://api.ctx.damian-luginbuehl.ch/v1/';
const API = {
    fetch: {
        overview: async function (category) {
            const request = await globalThis.fetch(`${APIURL}content/portfolio?portfolio=dal-main&category=${category}`, {
                method: "GET"
            });
            if (request.status == 404) {
                return;
            }
            const response = await request.json();
            return response;
        }
    }
};
export { API };
