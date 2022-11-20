const topicEmpty = {
  _id: null,
  title: null,
  description: null,
  limit: null,
  lecturerId: {
    _id: null,
  },
  majorId: {
    _id: null,
  },
};

const initState = {
  currentTopic: topicEmpty,
};

const getters = {
  currentTopic: (state) => state.currentTopic._id,
};

const actions = {
  updateTopic ({ commit, dispatch, rootState }, payload) {
    try {
      commit('setTopic', payload);
    } catch (e) {
      // handle ui display error in UI
      console.log('Error in login');
    }
  },
};

const mutations = {
  setTopic: (state, topic) => {
    state.currentTopic = topic;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
