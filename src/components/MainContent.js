import React from 'react';
import CategoryNav from './CategoryNav';
import PinCard from './PinCard';
import PinSkeleton from './PinSkeleton';

function MainContent({
  pinsWithMeta,
  isLoading,
  onDeletePin,
  onToggleSave,
  activeCategory,
  onCategoryChange,
  user,
}) {
  return (
    <main className="main-content">
      {user && (
        <CategoryNav activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
      )}

      <div className="masonry-grid">
        {isLoading ? (
          Array(12)
            .fill(0)
            .map((_, i) => <PinSkeleton key={i} />)
        ) : pinsWithMeta.length > 0 ? (
          pinsWithMeta.map(({ pin, saved, canDelete }) => (
            <PinCard
              key={pin.id}
              id={pin.id}
              image={pin.image}
              saved={saved}
              canDelete={canDelete}
              onDelete={onDeletePin}
              onToggleSave={onToggleSave}
            />
          ))
        ) : (
          <h3 className="empty-message">Ничего не найдено 😢</h3>
        )}
      </div>
    </main>
  );
}

export default MainContent;
