import { Commit, Module } from "vuex";
import {RootState} from "./index"
import axios from "axios";

export interface I_Character {
    id:number;
    name:string;
    status:string;
    image:string;
}

export interface I_CharactersModuleState {
    characters: I_Character[],
    character: I_Character,
    totalCount:number | null,
    isLoading:boolean,
    currentPage: number;
    totalPages: number;
}

const state: I_CharactersModuleState = {
    characters:[],
    character:{
        id: 0,
        name:"",
        status:"",
        image:""
    },
    totalCount: null,
    isLoading:false,
    currentPage: 1,
    totalPages: 1,
}

const mutations = {
    SET_CHARACTERS(state: I_CharactersModuleState, payload: I_Character[]) {
        state.characters = [...state.characters, ...payload];
    },

    SET_COUNT(state:I_CharactersModuleState, payload:number) {
        state.totalCount = payload;
    },

    SET_LOADING(state: I_CharactersModuleState, isLoading: boolean) {
        state.isLoading = isLoading;
    },
    SET_PAGE(state: I_CharactersModuleState, page: number) {
        state.currentPage = page;
    },
    SET_TOTAL_PAGES(state: I_CharactersModuleState, totalPages: number) {
        state.totalPages = totalPages;
    },
    SET_CHARACTER(state: I_CharactersModuleState, payload: I_Character) {
        state.character = payload;
    }
};

const actions = {
    async fetchCharacters({ commit }: { commit: Commit }) {

        if (state.isLoading || state.currentPage > state.totalPages ) return;
        if(!state.characters.length){
            commit('SET_LOADING', true);
        }
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?page=${state.currentPage}`);
            const characters = res.data.results;
            const totalCount = res.data.info.count;
            const totalPages = res.data.info.pages;

            if(characters) {
                commit('SET_CHARACTERS',characters);
                commit('SET_TOTAL_PAGES', totalPages);
                commit('SET_PAGE', state.currentPage + 1);
                commit('SET_COUNT', totalCount);
            }
        } catch (error) {
            console.error('Failed to fetch characters', error);
        } finally {
            commit('SET_LOADING', false);
        }
    },

    async fetchCharacterById({commit}:{commit:Commit}, id:string) {
        commit("SET_LOADING", true)
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/${id}`);
            const character = res.data;

            if(character) {
                commit('SET_CHARACTER', character);
            }
        } catch (error) {
            console.error('Failed to fetch character', error);
        }
        finally {
            commit('SET_LOADING',false);
        }
    }
}


const charactersModule: Module<I_CharactersModuleState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  
export default charactersModule;