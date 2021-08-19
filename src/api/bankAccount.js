import fetch from './fetch';

export default {
  getBankAccounts: (query) => fetch.get('/bankAccount/getBankAccounts', query),
};
