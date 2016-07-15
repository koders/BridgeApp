export default class Language {
  constructor(options) {
    this.language = options.language || 'en';
    this.dictionary = {};
    this.dictionary['en'] = require('./lang.en.json');
    this.dictionary['lv'] = require('./lang.lv.json');
  }

  get(value) {
    return this.dictionary[this.language][value] || value;
  }

  setLanguage(value) {
    if(this.dictionary[value]) {
      this.language = value;
    }
  }

}
