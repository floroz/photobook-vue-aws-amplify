import { Auth } from "aws-amplify";

export const auth = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("setUser", null);
      return await Auth.signOut();
    },
    async login({ commit }, { username, password }) {
      try {
        await Auth.signIn({
          username,
          password,
        });

        const userInfo = await Auth.currentUserInfo();
        commit("setUser", userInfo);
        return Promise.resolve("Success");
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async signup(_, { username, password, email }) {
      try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
          },
        });
        return Promise.resolve("Success");
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async confirmSignup(_, { username, code }) {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve("Success");
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async authAction({ commit }) {
      try {
        const userInfo = await Auth.currentUserInfo();
        commit("setUser", userInfo);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
