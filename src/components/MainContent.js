import React from 'react';
import FilterMenu from './FilterMenu';
import ImageCard from './ImageCard';
import AddPinForm from './AddPinForm';

function MainContent() {
  return (
    <main className="main-content">
      <h2>Welcome to your Inspiration Board</h2>
      
      <FilterMenu /> {/* Меню категорий */}
      
      <div className="content-layout" style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        
        {/* Сетка с картинками */}
        <div className="placeholder-grid" style={{ display: 'flex', gap: '20px' }}>
          <ImageCard 
            title="Minimalist Desk" 
            imageUrl="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300" 
          />
          <ImageCard 
            title="Cozy Interior" 
            imageUrl="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300" 
          />
        </div>

        {/* Форма добавления сбоку */}
        <aside>
          <AddPinForm />
        </aside>

      </div>
    </main>
  );
}

export default MainContent;