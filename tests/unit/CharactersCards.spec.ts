import { flushPromises, mount } from '@vue/test-utils'
import CharactersCard from '../../src/components/characters/CharactersCards.vue';
import CharacterCard from "../../src/components/characters/CharacterCard.vue"
import LoaderSpinner from "../../src/components/common/LoaderSpinner.vue"
import { createStore } from 'vuex'


const createMockStore = () => {
    return createStore({
        modules:{
            charactersModule:{
                namespaced:true,
                state:()=>({
                    characters:[],
                    isLoading:false
                }),
                actions: {
                    fetchCharacters: jest.fn()
                },
                mutations: {
                  setCharacters: (state, characters) => state.characters = characters,
                  setLoading: (state, isLoading) => state.isLoading = isLoading
                }
            }
        }
    })
}

describe('CharactersCard.vue',()=>{
    let wrapper:ReturnType<typeof mount>;
    let mockStore:any;
   
    beforeEach(()=>{
        mockStore= createMockStore();
        wrapper=mount(CharactersCard,{
            global:{
                plugins:[mockStore],
                stubs: {
                    'router-link': true 
                  }
            }
        })
    })
    
    it('должен отображать список персонажей при наличии данных', async()=>{
        mockStore.commit('charactersModule/setCharacters', [
            { id: 1, name: 'Character 1', image: 'image1.jpg', status: 'Alive' },
            { id: 2, name: 'Character 2', image: 'image2.jpg', status: 'Dead' }
        ]);
        await flushPromises()
        expect(wrapper.findAllComponents(CharacterCard)).toHaveLength(2)
    })

    it('должен отображать загрузку при загрузке данных', async()=>{
        mockStore.commit('charactersModule/setLoading', true);
        await flushPromises();
        expect(wrapper.findComponent(LoaderSpinner).exists()).toBe(true);
    })
})