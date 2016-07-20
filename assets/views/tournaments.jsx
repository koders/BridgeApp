import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Language from '../languages/Language.js';

$(function(){

  var lang = new Language({language: 'en'});

  var authCheckUrl = 'http://localhost:1337/auth/check';

  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        language : 'en'
      };
    }

    componentDidMount() {
      this.serverRequest = $.get(authCheckUrl, function (result) {
        console.log(result);
        this.setState({
          authenticated: result
        });
      }.bind(this));
    }

    componentWillUnmount() {
      this.serverRequest.abort();
    }

    setLanguage(value) {
      lang.setLanguage(value);
      this.setState({language: value});
    }

    render() {
      return (
        <div>
          <nav className="main-navigation">
            <div className="nav-wrapper">
              <a id="logo-container" href="#" className="brand-logo"><img src="/images/logo_web_big.jpg"/></a>
              <ul className="nav right hide-on-med-and-down">
                <li>
                  <ProfileButton authenticated={this.state.authenticated} />
                </li>
                <li>
                  <LanguageDropdown language={this.state.language} setLanguage={this.setLanguage.bind(this)}/>
                </li>
              </ul>
            </div>
          </nav>
          {lang.get('greeting')}
        </div>
      );
    }
  }

  class ProfileButton extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      var authenticated = this.props.authenticated;
      if(!authenticated) {
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
            <img src={"http://graph.facebook.com/" + authenticated.uid + "/picture"} alt="" className="circle" />
            <div className="text">
              <div className="title">{authenticated.name}</div>
              <div className="subtitle">User</div>
            </div>
            <i className="fa fa-caret-down"/>
          </a>
          <ul className="dropdown-menu nav">
            <li>
              <a>
                <i className="fa fa-user"/>
                Profile
              </a>
            </li>
            <li>
              <a href="/auth/logout">
                <i className="fa fa-power-off red-text"/>
                Logout
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
