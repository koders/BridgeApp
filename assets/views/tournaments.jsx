import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import FlipMove from 'react-flip-move';
import Language from '../languages/Language.js';
import { browserHistory, Route, Router, Link } from 'react-router';
import NotFound from './404.js';

$(function(){

  var lang = new Language({language: 'en'});

  var authCheckUrl = '/auth/check';
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
                  <Link to="/tournaments">{lang.get('tournaments')}</Link>
                </li>
              </ul>
            </nav>
            <div className="main-content">
              {/*<FlipMove*/}
              {/*>*/}
                {React.cloneElement(this.props.children, {
                  user: this.state.user,
                  key: location.pathname
                })}
              {/*</FlipMove>*/}
            </div>
          </div>
        </div>
      );
    }
  }

  class Tournaments extends Component {
    constructor(props) {
      super(props);
    }

    openTournament(id) {
      browserHistory.push('/tournaments/' + id);
    }

    render() {
      var tournaments = [{
        uid: 1,
        name: 'Turnīru sērijas Omulīgais bridžs 1. turnīrs',
        organiser: 'SBK',
        date: '23.07.2016',
        location: 'Saldus',
        time: '10:00'
      }];
      return(
        <div>
          <h3 className="center-align">{lang.get('tournamentHeader')}</h3>
          { this.props.user && this.props.user.role_id > 1
            ?
            <Link to="/tournaments/new" className="waves-effect waves-light blue lighten-1 btn"><i className="fa fa-plus left"/>{lang.get('createTournament')}</Link>
            :
            null
          }
          <div className="row">
            <div className="col s12">
              <table className="highlight">
                <thead>
                  <tr>
                    <th>{lang.get('tournament')}</th>
                    <th>{lang.get('organiser')}</th>
                    <th>{lang.get('date')}</th>
                    <th>{lang.get('location')}</th>
                    <th>{lang.get('time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map(tournament => (
                    <tr key="tournament.id" onClick={this.openTournament.bind(this, tournament.uid)}>
                      <td>{tournament.name}</td>
                      <td>{tournament.organiser}</td>
                      <td>{tournament.date}</td>
                      <td>{tournament.location}</td>
                      <td>{tournament.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  }

  class NewTournament extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'yo',
        organiser: '',
        date: '',
        location: '',
        time: ''
      };
    }

    componentDidMount() {
      var self = this;
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        onSet: function(value) {
          self.setState({date: value.select});
        }
      });
    }

    send() {
      alert(this.state);
    }

    handleChange(field, event) {
      var change = {};
      change[field] = event.target.value;
      this.setState(change);
      console.log(change);
    }

    render() {
      return(
        <div>
          <h3 className="center-align">{lang.get('createTournament')}</h3>
          <div className="row">
            <form className="col s12">
              <div className="row center-align">
                <div className="input-field col s6">
                  <input id="tournament_name" type="text" value={this.state.name}
                         onChange={this.handleChange.bind(this, 'name')}/>
                    <label htmlFor="tournament_name">{lang.get('tournamentName')}</label>
                </div>
              </div>
              <div className="row center-align">
                <div className="input-field col s6">
                  <input id="tournament_organiser" type="text" value={this.state.organiser}
                         onChange={this.handleChange.bind(this, 'organiser')}/>
                  <label htmlFor="tournament_organiser">{lang.get('organiser')}</label>
                </div>
              </div>
              <div className="row center-align">
                <div className="input-field col s6">
                  <input id="tournament_date" type="date" className="datepicker" value={this.state.date}
                         onChange={this.handleChange.bind(this, 'date')}/>
                  <label htmlFor="tournament_date">{lang.get('date')}</label>
                </div>
              </div>
              <div className="row center-align">
                <div className="input-field col s6">
                  <input id="tournament_location" type="text" value={this.state.location}
                         onChange={this.handleChange.bind(this, 'location')}/>
                  <label htmlFor="tournament_location">{lang.get('location')}</label>
                </div>
              </div>
              <div className="row center-align">
                <div className="input-field col s6">
                  <input id="tournament_time" type="text" value={this.state.time}
                         onChange={this.handleChange.bind(this, 'time')}/>
                  <label htmlFor="tournament_time">{lang.get('time')}</label>
                </div>
              </div>
              <button type="button" className="waves-effect waves-light green lighten-1 btn" onClick={this.send}>{lang.get('create')}</button>
            </form>
          </div>
        </div>
      )
    }
  }

  class Tournament extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div>
          Test
        </div>
      )
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
      console.log(user);
      return(
        <div className="dropdown dropdown-inline profile-dropdown">
          <a className="dropdown-toggle-btn profile-button waves-effect" data-toggle="dropdown">
            <img src={"http://graph.facebook.com/" + user.uid + "/picture"} alt="" className="circle" />
            <div className="text">
              <div className="title">{user.name}</div>
              <div className="subtitle">{user.role ? lang.get(user.role.toLowerCase()) : null}</div>
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
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="tournaments" component={Tournaments}/>
        <Route path="tournaments/new" component={NewTournament}/>
        <Route path="tournaments/:tournamentId" component={Tournament}/>
        {/*<Route path="*" component={NotFound}/>*/}
      </Route>
    </Router>,
    document.getElementById('container')
  );

});
