import request from "../../utils/request";
import router from "../../router";

const state = {
  step: {
    payAccount: "123456",
  },
};

const actions = {
  async submitStepFORM({ commit }, { payload }) {
    await request({ url: "/api/form", method: "POST", data: payload });
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  },
};

const mutations = {
  saveStepFormData(state, { payload }) {
    console.log(payload);
    state.step = {
      ...state.step,
      ...payload,
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
