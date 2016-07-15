import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Language from '../languages/Language.js';

$(function(){

  var lang = new Language({language: 'en'});

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        language : 'en'
      };
    }

    setLanguage(value) {
      lang.setLanguage(value);
      this.setState({language: value});
    }

    render() {
      const {language} = this.state;

      return (
        <p>
          {lang.get('greeting')}
          <button className="waves-effect waves-light btn" onClick={this.setLanguage.bind(this, 'lv')}>LV</button>
          <button className="waves-effect waves-light btn" onClick={this.setLanguage.bind(this, 'en')}>EN</button>
        </p>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );

  // ReactDOM.render(<Tournaments />, document.getElementsByClassName('tournaments')[0]);

});
