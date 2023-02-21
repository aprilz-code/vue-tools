const state = {
  device: "Desktop",
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  }

};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  }
};

export default {
  namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};
