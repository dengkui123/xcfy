import fetch from './fetch';

export default {
    login: query => fetch.post('/menu/login/intranet', query)
};
