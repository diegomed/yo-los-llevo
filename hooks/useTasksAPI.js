import axios from 'axios';

export function useTasksAPI() {
    function getTasks() {
        return axios.get('https://yolosllevo.onrender.com/feed/tasks');
    }

    function addTask(data) {
        return axios.post('https://yolosllevo.onrender.com/feed/task', data);
    }

    return { getTasks, addTask };
}