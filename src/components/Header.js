import React from 'react';

function Header() {
  return (
    <header className="app-header">
      <h1>Visual Discovery App</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/explore">Explore</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;