import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  state = {
    searchText: '',
  };
  /**
   * Handles input change
   * @param {object} e Event
   */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Handles submit and calls searchUsers function
   * as well as dispalys alert if searchString is empty
   * @param {object} e Event
   */
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchText === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.searchText);
      this.setState({ searchText: '' });
    }
  };

  render() {
    const { searchText } = this.state;
    const { clearUsers, users } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            name="searchText"
            onChange={this.handleChange}
            placeholder="Search Users..."
            value={searchText}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {users.length > 0 && (
          <input
            type="submit"
            value="Clear"
            onClick={clearUsers}
            className="btn btn-light btn-block"
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
