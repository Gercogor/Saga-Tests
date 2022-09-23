import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: false,
});

export const getFromAPIAxios = async (page = 1, limit = 10, api = 'posts') => await instance.get(`${api}?_page=${page}&_limit=${limit}`)
    .then(response => response.data)
    .catch(error => console.log(error))

export const testApi = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const usersIds = response.data.map(users => users.id);
        return usersIds;
    } catch (e) {
        return new Error(e)
    }
}
