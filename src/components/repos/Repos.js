import React from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

const Repo = ({ repos }) => {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

RepoItem.propTypes = {
  repos: PropTypes.array,
};

export default Repo;
