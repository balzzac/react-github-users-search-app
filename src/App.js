import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

  /**
   * Fetches users by searchText
   * @param {string} searchText
   */
  searchUsers = async (searchText) => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ loading: false, users: res.data.items });
    } catch (error) {
      console.log('Logged output: App -> searchUsers -> error', error);

      this.setState({ loading: false });
    }
  };

  /**
   * Clears users from state
   */
  clearUsers = (e) => {
    this.setState({ users: [], loading: false });
  };

  /**
   * Displays alert
   */
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  /**
   * Fetches user by userName
   * @param {string} userName
   */
  getUser = async (userName) => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({ loading: false, user: res.data });
      console.log('Logged output: App -> getUser -> res.data', res.data);
    } catch (error) {
      console.log('Logged output: App -> getUser -> error', error);
      this.setState({ loading: false });
    }
  };

  /**
   * Fetches user repos by userName
   * @param {string} userName
   */
  getUserRepos = async (userName) => {
    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({ loading: false, repos: res.data });
      console.log('Logged output: App -> getUser -> res.data', res.data);
    } catch (error) {
      console.log('Logged output: App -> getUser -> error', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, users, alert, user, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      setAlert={this.setAlert}
                      users={users}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
