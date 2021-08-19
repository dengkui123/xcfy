const VApp = {
  vueInst: null,
  store: {
    local: {
      get(key) {
        return window.jsStorage.get(setStoreKey(key));
      },
      set(key, value) {
        window.jsStorage.set(setStoreKey(key), value);
      },
      remove(key) {
        window.jsStorage.remove(setStoreKey(key));
      },
      clearAll() {
        window.jsStorage.clearAll();
      },
    },
  },
};
const setStoreKey = (key) => {
  const {NODE_ENV} = process.env;
  return `zh_${NODE_ENV}_${key}`;
};

export default VApp;
