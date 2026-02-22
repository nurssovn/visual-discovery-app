import React from 'react';

function MainContent() {
  return (
    <main className="main-content">
      <h2>Welcome to your Inspiration Board</h2>
      <p>Here you will soon see a beautiful masonry grid of images!</p>
      {/* Позже здесь будет сетка с картинками */}
      <div className="placeholder-grid">
        <div className="card">Image 1</div>
        <div className="card">Image 2</div>
        <div className="card">Image 3</div>
      </div>
    </main>
  );
}

export default MainContent;