import { createStore } from 'vuex'
import { I_CharactersModuleState } from './charactersModule'
import charactersModule from "./charactersModule"

export interface RootState{
  characters: I_CharactersModuleState
}

export default createStore({
  modules: {
    charactersModule: charactersModule
  }
})
