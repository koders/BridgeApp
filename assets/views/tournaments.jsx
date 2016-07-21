import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Language from '../languages/Language.js';

$(function(){

  var lang = new Language({language: 'en'});

  var authCheckUrl = 'auth/check';
  var path = require('path');

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        language: 'en'
      };
    }

    componentDidMount() {
      this.serverRequest = $.get(authCheckUrl, function (result) {
        console.log(result);
        if(!result) {
          return;
        }
        lang.setLanguage(result.language);
        this.setState({
          user: result,
          language: result.language
        });
      }.bind(this));
    }

    componentWillUnmount() {
      this.serverRequest.abort();
    }

    setLanguage(value) {
      if(this.state.user) {
        $.post(path.join('users', this.state.user.uid, 'language'), {language: value});
      }
      lang.setLanguage(value);
      this.setState({language: value});
    }

    render() {
      const user = this.state.user;
      const language = this.state.language;
      return (
        <div>
          <nav className="main-navigation blue-grey darken-4">
            <div className="nav-wrapper">
              <a id="logo-container" href="#" className="brand-logo"><img src="/images/logo_web_big.jpg"/></a>
              <ul className="nav right hide-on-med-and-down">
                <li>
                  <ProfileButton user={user} />
                </li>
                <li>
                  <LanguageDropdown language={language} setLanguage={this.setLanguage.bind(this)}/>
                </li>
              </ul>
            </div>
          </nav>
          <div className="main-content-wrapper">
            <nav className="sidenav blue-grey darken-4">
              <ul>
                <li>
                  <a>{lang.get('tournaments')}</a>
                </li>
              </ul>
            </nav>
            <div className="main-content">
              {lang.get('greeting')}
            </div>
          </div>
        </div>
      );
    }
  }

  class ProfileButton extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      var user = this.props.user;
      if(!user) {
        return(
          <a href="/auth/facebook/" className="btn facebook">
            <i className="fa fa-facebook left" aria-hidden="true"/>
            {lang.get('facebook_login')}
          </a>
        )
      }
      return(
        <div className="dropdown dropdown-inline profile-dropdown">
          <a className="dropdown-toggle-btn profile-button waves-effect" data-toggle="dropdown">
            <img src={"http://graph.facebook.com/" + user.uid + "/picture"} alt="" className="circle" />
            <div className="text">
              <div className="title">{user.name}</div>
              <div className="subtitle">{lang.get(user.role.toLowerCase())}</div>
            </div>
            <i className="fa fa-caret-down"/>
          </a>
          <ul className="dropdown-menu nav">
            <li>
              <a>
                <i className="fa fa-user"/>
                {lang.get('profile')}
              </a>
            </li>
            <li>
              <a href="/auth/logout">
                <i className="fa fa-power-off red-text"/>
                {lang.get('logout')}
              </a>
            </li>
          </ul>
        </div>
      )
    }
  }

  class LanguageDropdown extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      var setLanguage = this.props.setLanguage;
      var flagLanguage = this.props.language;
      if( flagLanguage == 'en' ) {
        flagLanguage = 'gb';
      }
      return(
        <div className="dropdown">
          <div className="dropdown-toggle language waves-effect" data-toggle="dropdown">
            <div className={"flag-icon flag-icon-" + flagLanguage + " flag"}></div>
          </div>
          <ul className="dropdown-menu dropdown-menu-right">
            <li>
              <a onClick={setLanguage.bind(this, 'lv')}>
                <div className="flag-icon flag-icon-lv flag"></div>
                <span>Latviski</span>
              </a>
            </li>
            <li>
              <a onClick={setLanguage.bind(this, 'en')}>
                <div className="flag-icon flag-icon-gb flag"></div>
                <span>English</span>
              </a>
            </li>
          </ul>
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );

  // ReactDOM.render(<Tournaments />, document.getElementsByClassName('tournaments')[0]);

});
