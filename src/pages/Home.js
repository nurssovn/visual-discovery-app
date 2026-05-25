import React, { useState, useContext, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import { AppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { filterPins, canDeletePin } from '../utils/filterPins';

function Home() {
  const { pins, isLoading, error, handleDeletePin, handleToggleSave, fetchPins } =
    useContext(AppContext);
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (!user) {
      setActiveCategory('all');
    }
  }, [user]);

  const filteredPins = useMemo(
    () =>
      filterPins(pins, {
        searchTerm,
        activeCategory,
        username: user?.username,
      }),
    [pins, searchTerm, activeCategory, user]
  );

  const pinsWithMeta = useMemo(
    () =>
      filteredPins.map((pin) => ({
        pin,
        saved: pin.savedBy?.includes(user?.username),
        canDelete: canDeletePin(pin, user?.username),
      })),
    [filteredPins, user]
  );

  return (
    <div className="home-page">
      <Header searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />

      {isLoading && (
        <MainContent
          pinsWithMeta={[]}
          isLoading
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          user={user}
          onDeletePin={handleDeletePin}
          onToggleSave={handleToggleSave}
        />
      )}

      {error && !isLoading && (
        <div className="page-status page-status--error">
          <h2>{error}</h2>
          <button type="button" className="login-nav-btn" onClick={fetchPins}>
            Повторить
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <MainContent
          pinsWithMeta={pinsWithMeta}
          isLoading={false}
          onDeletePin={handleDeletePin}
          onToggleSave={handleToggleSave}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          user={user}
        />
      )}
    </div>
  );
}

export default Home;
