import httpService from "./http.service";
const todosEndepoint = "todos/";
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndepoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        });
        return data;
    },
    post: async () => {
        const {data} = await httpService.post(todosEndepoint, {
            title: "Title-Task",
            completed: false
        });
        // const {data} = await httpService.post(todosEndepoint, {
        //     body: JSON.stringify({
        //         title: 'foo',
        //         body: 'bar',
        //         userId: 1,
        //     })
        // });
        return data;
    }
};
export default todosService;
