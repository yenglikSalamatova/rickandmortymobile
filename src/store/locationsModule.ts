import { Commit, Module } from 'vuex'
import { RootState } from './index'
import axios from 'axios'
import { I_Character } from './charactersModule'

export interface I_Location {
  id: number
  name: string
  type: string
  dimension: string
  residents: I_Character[] | string[]
}

export interface I_LocationsModuleState {
  locations: I_Location[]
  location: I_Location
  isLoading: boolean
  totalCount: number
  currentPage: number
  totalPages: number
}

const state: I_LocationsModuleState = {
  locations: [],
  location: {
    id: 0,
    name: '',
    type: '',
    dimension: '',
    residents: []
  },
  isLoading: false,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1
}

const mutations = {
  SET_EPISODES(state: I_LocationsModuleState, payload: I_Location[]) {
    state.locations = [...state.locations, ...payload]
  },
  SET_EPISODE(state: I_LocationsModuleState, payload: I_Location) {
    state.location = payload
  },
  SET_LOADING(state: I_LocationsModuleState, payload: boolean) {
    state.isLoading = payload
  },

  SET_COUNT(state: I_LocationsModuleState, payload: number) {
    state.totalCount = payload
  },

  SET_PAGE(state: I_LocationsModuleState, payload: number) {
    state.currentPage = payload
  },

  SET_TOTAL_PAGES(state: I_LocationsModuleState, payload: number) {
    state.totalPages = payload
  },

  SET_RESIDENT(
    state: I_LocationsModuleState,
    payload: { index: number; character: I_Character }
  ) {
    state.location.residents.splice(payload.index, 1, payload.character)
  }
}

const actions = {
  async fetchLocations({ commit }: { commit: Commit }) {
    if (state.isLoading || state.currentPage > state.totalPages) return
    if (!state.locations.length) {
      commit('SET_LOADING', true)
    }
    try {
      const res = await axios(
        `https://rickandmortyapi.com/api/location/?page=${state.currentPage}`
      )
      const locations = res.data.results
      const totalCount = res.data.info.count
      const totalPages = res.data.info.pages

      if (locations) {
        commit('SET_EPISODES', locations)
        commit('SET_TOTAL_PAGES', totalPages)
        commit('SET_PAGE', state.currentPage + 1)
        commit('SET_COUNT', totalCount)
      }
    } catch (error) {
      console.error('Failed to fetch', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchLocation({ commit }: { commit: Commit }, id: string) {
    commit('SET_LOADING', true)
    try {
      const locationRes = await axios(
        `https://rickandmortyapi.com/api/location/${id}`
      )

      if (locationRes.data) {
        commit('SET_EPISODE', locationRes.data)
      }

      // Load characters
      const characterUrls = locationRes.data.residents;
      characterUrls.forEach((url: string, index: number) => {
        axios(url)
          .then((characterRes) => {
            if (characterRes.data) {
              commit('SET_RESIDENT', { index, character: characterRes.data })
            }
          })
          .catch((error) => {
            console.error('Failed to fetch character', error)
          })
      })
    } catch (error) {
      console.error('Failed to fetch', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const locationsModule: Module<I_LocationsModuleState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default locationsModule
