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
      var flagLanguage = language;
      if( flagLanguage == 'en' ) {
        flagLanguage = 'gb';
      }
      return (
        <div>
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
          </ul>
          <nav className="main-navigation">
            <div className="nav-wrapper">
              <a id="logo-container" href="#" className="brand-logo"><img src="/images/logo_web_big.jpg"/></a>
              <ul className="nav right hide-on-med-and-down">
                <li>
                  <a className="profile-button waves-effect">
                    <img src="https://z-1-scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/13528749_836304686475372_3891635766179124219_n.jpg?oh=86f77c4950356ad43828429b6248de07&oe=57F0E761" alt="" className="circle" />
                    <div className="text">
                      <div className="title">Rihards Fridrihsons</div>
                      <div className="subtitle">User</div>
                    </div>
                    <i className="fa fa-caret-down"/>
                  </a>
                </li>
                <li>
                  <div className="dropdown">
                    <div className="dropdown-toggle language waves-effect" data-toggle="dropdown">
                      <div className={"flag-icon flag-icon-" + flagLanguage + " flag"}></div>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li>
                        <a onClick={this.setLanguage.bind(this, 'lv')}>
                          <div className="flag-icon flag-icon-lv flag"></div>
                          <span>Latviski</span>
                        </a>
                      </li>
                      <li>
                        <a onClick={this.setLanguage.bind(this, 'en')}>
                          <div className="flag-icon flag-icon-gb flag"></div>
                          <span>English</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {lang.get('greeting')}
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );

  // ReactDOM.render(<Tournaments />, document.getElementsByClassName('tournaments')[0]);

});
