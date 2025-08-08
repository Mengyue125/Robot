import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'
import zhcn from '@/locales/zh-cn.json'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh-cn',      // 默认语言
  fallbackLocale: 'en',  // 回退语言
  messages: {
    en,
    'zh-cn': zhcn
  }
})

export default i18n