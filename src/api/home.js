import fetch from './fetch';

export default {
    allInfo: query => fetch.post('/product/allInfo', query)
};
