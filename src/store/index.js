import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: null,
    usuario: null
  },
  getters: {
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    setAuth({ commit }) {
      if (localStorage.getItem('auth')) {
        commit('setAuth', JSON.parse(localStorage.getItem('auth')))
      }
    },
    logout() {
      localStorage.removeItem('auth');
      location.reload();
    },
    mayuscula({ commit }) {
      if (localStorage.getItem('auth')) {
        commit('setUsuario', JSON.parse(localStorage.getItem('auth.data.usuario')))
      }
    }
  },
  modules: {
  }
})
