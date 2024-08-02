// src/i18n.ts
import { createI18n } from 'vue-i18n'


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
      en: {
        characters:{
            title: "Characters",
            species:"Type",
            gender:"Gender",
            location:"Location",
            episodes:"Episodes where the character appeared"
        },
        episodes: {
          title: "Episodes",
          air_date:"Air date",
          episode:"Episode",
          characters:"Characters in this episode"
        },
        locations:{
            title:"Locations",
            type:"Type",
            dimension:"Dimension",
            characters:"Characters in this location"
        },
        myGithub:"My Github",
        
      },

      ru: {
        characters: {
            title: "Персонажи",
            species: "Вид",
            gender: "Пол",
            location: "Локация",
            episodes: "Эпизоды, в которых появился персонаж"
        },
        episodes: {
          title: "Эпизоды",
          air_date: "Дата выхода",
          episode: "Эпизод",
          characters: "Персонажи в этом эпизоде"
        },
        locations: {
            title: "Локации",
            type: "Тип",
            dimension: "Измерение",
            characters: "Персонажи в этой локации"
        },
        myGithub: "Мой Github",
        
      }
    }
  })
export default i18n
