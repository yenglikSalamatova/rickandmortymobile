import { Commit, Module } from "vuex";
import {RootState} from "./index"
import axios from "axios";
import { I_Character } from "./charactersModule";

export interface I_Episode {
    id:number;
    name:string;
    air_date:string;
    episode:string;
    characters: I_Character[] | string[],
    url:string,   
}

export interface I_EpisodesModuleState {
   episodes:I_Episode[],
   episode:I_Episode,
   isLoading:boolean,
   totalCount:number,
   currentPage: number,
   totalPages:number,
}

const state: I_EpisodesModuleState = {
    episodes:[],
    episode: {
        id:0,
        name:'',
        air_date:'',
        episode:'',
        characters:[],
        url:'',
    },
    isLoading:false,
    totalCount:0,
    currentPage:1,
    totalPages:1,
}

const mutations = {
    SET_EPISODES(state: I_EpisodesModuleState, payload: I_Episode[]) {
        state.episodes = [...state.episodes, ...payload];
    },
    SET_EPISODE(state: I_EpisodesModuleState, payload: I_Episode) {
        state.episode = payload;
    },
    SET_LOADING(state:I_EpisodesModuleState, payload:boolean) {
        state.isLoading = payload;
    },

    SET_COUNT(state:I_EpisodesModuleState, payload:number) {
        state.totalCount = payload;
    },

    SET_PAGE(state:I_EpisodesModuleState, payload:number) {
        state.currentPage=payload;
    },

    SET_TOTAL_PAGES(state: I_EpisodesModuleState, payload: number) {
        state.totalPages = payload;
    },

    SET_CHARACTER(state: I_EpisodesModuleState, payload: { index: number, character: I_Character }) {
        state.episode.characters.splice(payload.index, 1, payload.character);
    },

};

const actions = {
    async fetchEpisodes({ commit }: { commit: Commit }) {
        if (state.isLoading || state.currentPage>state.totalPages) return;
        if(!state.episodes.length){
            commit('SET_LOADING', true);
        }
        try {
            const res = await axios.get(`https://rickandmortyapi.com/api/episode/?page=${state.currentPage}`);
            const episodes = res.data.results;
            const totalCount = res.data.info.count;
            const totalPages = res.data.info.pages;

            if(episodes) {
                commit('SET_EPISODES',episodes);
                commit('SET_TOTAL_PAGES', totalPages);
                commit('SET_PAGE', state.currentPage + 1);
                commit('SET_COUNT', totalCount);
            }
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchEpisode({ commit }: { commit: Commit },id:string) {
        commit('SET_LOADING', true);
        try {
            const episodesRes = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);

            if(episodesRes.data) {
                commit("SET_EPISODE", episodesRes.data);
            }

           // Load characters
            const characterUrls = episodesRes.data.characters;
            characterUrls.forEach((url: string, index: number) => {
                axios.get(url)
                    .then(characterRes => {
                        if (characterRes.data) {
                            commit("SET_CHARACTER", { index, character: characterRes.data });
                        }
                    })
                    .catch(error => {
                        console.error('Failed to fetch character', error);
                    });
            });
        } catch (error) {
            console.error('Failed to fetch', error);
        } finally {
            commit('SET_LOADING', false);
        }
    }
}


const episodesModule: Module<I_EpisodesModuleState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  
export default episodesModule;