import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ searchUsers, setAlert, clearUsers, users }) {
  const [searchText, setSearchText] = useState('');

  /**
   * Handles input change
   * @param {object} e Event
   */
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  /**
   * Handles submit and calls searchUsers function
   * as well as displays alert if searchString is empty
   * @param {object} e Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(searchText);
      setSearchText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="searchText"
          onChange={handleChange}
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

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
