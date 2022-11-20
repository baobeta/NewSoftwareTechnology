const userEmpty = {
  email: null,
  _id: null,
  roleId: {
    _id: null,
  },
  picture: null,
  name: null,
  sex: null,
};

const initState = {
  currentUser: userEmpty,
};

const getters = {
  currentUser: (state) => state.currentUser,
};

const actions = {
  updateUser ({ commit, dispatch, rootState }, payload) {
    try {
      commit('setUser', payload);
    } catch (e) {
      // handle ui display error in UI
      console.log('Error in login');
    }
  },
};

const mutations = {
  setUser: (state, user) => {
    state.currentUser = user;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
