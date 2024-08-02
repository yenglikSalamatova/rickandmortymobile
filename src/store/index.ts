import { createStore } from 'vuex'
import { I_CharactersModuleState } from './charactersModule'
import charactersModule from "./charactersModule"
import episodesModule,{ I_EpisodesModuleState } from './episodesModule'
import locationsModule, { I_LocationsModuleState } from './locationsModule'

export interface RootState{
  charactersModule: I_CharactersModuleState,
  episodesModule: I_EpisodesModuleState,
  locationsModule: I_LocationsModuleState,
}

export default createStore({
  modules: {
    charactersModule,
    episodesModule,
    locationsModule
  }
})
