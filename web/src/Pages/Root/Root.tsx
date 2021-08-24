import React from 'react';
import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <main>
      <header> Welcome to Pacioli </header>
      <Link to='/home'> Take me home </Link>
      <Link to='/setup'> First time setup </Link>
    </main>
  );
};

export default Root;
