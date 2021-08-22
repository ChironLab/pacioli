import React from 'react';
import { Link } from 'react-router-dom';

const Root = () => {
  return (
    <main>
      <header> Welcome to Pacioli </header>
      <Link to='/home'> TAKE ME HOME </Link>
    </main>
  );
};

export default Root;
