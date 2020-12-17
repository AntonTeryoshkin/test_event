import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: JSON.parse(localStorage.getItem('events') || '[]')
  },
  mutations: {
    createEvent(state, event) {
      state.events.push(event)

      localStorage.setItem('events', JSON.stringify(state.events))
    },
    updateEvent(state, {title, id, date, time, time2, favorite}) {
      const events = state.events.concat()

      const idx = events.findIndex(t => t.id === id)
      const event = events[idx]

      events[idx] = {...event, title, date, time, time2, favorite}

      state.events = events
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    addtofavorEvent(state, id) {
      const idx = state.events.findIndex(t => t.id === id)
      state.events[idx].favorite = 'Yes'
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    removefromfavorEvent(state, id) {
      const idx = state.events.findIndex(t => t.id === id)
      state.events[idx].favorite = 'No'
      localStorage.setItem('events', JSON.stringify(state.events))
    },
    deletevent(state, id) {
      const idx = state.events.findIndex(t => t.id === id)
      state.events[idx].delevent = 'Yes'
      localStorage.setItem('events', JSON.stringify(state.events))
    },
  },
  actions: {
    createEvent({commit}, event) {
      commit('createEvent', event)
    },
    updateEvent({commit}, event) {
      commit('updateEvent', event)
    },
    addtofavorEvent({commit}, id) {
      commit('addtofavorEvent', id)
    },
    removefromfavorEvent({commit}, id) {
      commit('removefromfavorEvent', id)
    },
    deletevent({commit}, id) {
      commit('deletevent', id)
    },
  },
    getters: {
      events: s => s.events,
      eventById: s => id => s.events.find(t => t.id === id)
    }
})
