import axios from 'axios'
import store from "../store";
const endpoint = process.env.REACT_APP_API_ENDPOINT;

const request = (url, params = {}, method = 'get') => {

    const token = store.getState().user.isAuthorized ? store.getState().user.token : null;

    return axios({
        url,
        method,
        params: method === 'get' ? params : null,
        data: method === 'post' ? params: null,
        baseURL: endpoint,
        headers:  token ? {'Authorization': `Bearer ${token}`} : {}
    })

};

export {
    request
}