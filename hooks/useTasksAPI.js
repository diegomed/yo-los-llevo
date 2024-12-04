import axios from 'axios';

export function useTasksAPI() {
    function getTasks() {
        return axios.get('https://yolosllevo.onrender.com/feed/tasks');
    }

    function getTaskById(id) {
        return axios.get(`https://yolosllevo.onrender.com/feed/task/${id}`);
    }

    function addTask(data) {
        return axios.post('https://yolosllevo.onrender.com/feed/task', data);
    }

    function deleteTask(id) {
        return axios.delete(`https://yolosllevo.onrender.com/feed/task/${id}`);
    }

    function updateTask(data) {
        return axios.put('https://yolosllevo.onrender.com/feed/task', data);
    }

    return { getTasks, getTaskById, addTask, deleteTask, updateTask };
}