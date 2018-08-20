import axios from 'axios';

export function getForums() {
    return dispatch => {
        return axios.get('/api/forums/load');
    }
}

export function getTopics() {
    return dispatch => {
        return axios.get('/api/topics/load');
    }
}