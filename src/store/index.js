import { createStore } from "vuex";
export default createStore({
  state: {
    isLoading: false,
    logedIn: false,
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    id: "",
    userData: null, // Add userData state
  },

  getters: {
    isLoading: (state) => state.isLoading,
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    role: (state) => state.role,
    id: (state) => state.id,
    userData: (state) => state.userData, // Add getter for userData
  },
  mutations: {
    setLoading(state, item) {
      state.isLoading = item;
    },
    setLogin(state, item) {
      state.logedIn = item.logedIn;
      state.token = item.token;
      state.role = item.role;
      state.id = item.id;
    },
    updateUserData(state, userData) {
      state.userData = userData;
    },
    setLoginDefault(state) {
      state.logedIn = false;
      state.token = "";
      state.role = "";
      state.id = "";
      state.userData = null; // Reset user data when logged out
      localStorage.clear();
    },
  },

  actions: {},
  modules: {},
});
