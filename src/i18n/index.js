import { createI18n } from 'vue-i18n';

const msgs = {
  en: {
    AccountPage: require('./AccountPage/en.json'),
  },
  ja: {
    AccountPage: require('./AccountPage/ja.json'),
  },
};

const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: msgs,
});

export default i18n;