var store = {};

export default {
  set(key, v) {
    store[key] = v;
  },
  get(key) {
    return store[key];
  }
};
