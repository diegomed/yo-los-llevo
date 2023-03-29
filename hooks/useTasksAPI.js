import axios from 'axios';

export function useTasksAPI() {
    function getTasks() {
        return axios.get('https://pepper-elemental-cold.glitch.me/feed/tasks');
    }

    function addTask(data) {
        return axios.post('https://pepper-elemental-cold.glitch.me/feed/task', data);
    }

    return { getTasks, addTask };
}