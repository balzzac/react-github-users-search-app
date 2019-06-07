import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';

import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  /**
   * Fetches users by searchText
   * @param {string} searchText
   */
  const searchUsers = async (searchText) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setLoading(false);
      setUsers(res.data.items);
    } catch (error) {
      console.log('Logged output: App -> searchUsers -> error', error);

      setLoading(false);
    }
  };

  /**
   * Clears users from state
   */
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  /**
   * Displays alert
   * @param {string} msg
   * @param {string} type
   */
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  /**
   * Fetches user by userName
   * @param {string} userName
   */
  const getUser = async (userName) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setUser(res.data);
    } catch (error) {
      console.log('Logged output: App -> getUser -> error', error);
      setLoading(false);
    }
  };

  /**
   * Fetches user repos by userName
   * @param {string} userName
   */
  const getUserRepos = async (userName) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setRepos(res.data);
    } catch (error) {
      console.log('Logged output: App -> getUser -> error', error);
      setLoading(false);
    }
  };

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
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    setAlert={showAlert}
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
                  getUser={getUser}
                  getUserRepos={getUserRepos}
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

export default App;
