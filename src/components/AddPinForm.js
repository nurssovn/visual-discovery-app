import React, { useState } from 'react';

function AddPinForm({ onAdd, onClose }) {

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('all');
      
  const handleSubmit = (e) => {
    e.preventDefault();
      
    if (!imageUrl.trim() || !title.trim()) {
      alert('Пожалуйста, добавьте ссылку на картинку и название!');
      return;
    }
     
    const newPin = {
      id: Date.now(),
      image: imageUrl,
      title: title,
      category: category
    };
   
    onAdd(newPin);
        
    setImageUrl('');
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-pin-form-container">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <form onSubmit={handleSubmit} className="pin-form">
          <div className="form-left">
            <div className="image-preview-box">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="preview-img" />
              ) : (
                <div className="empty-preview">
                  <span>↑</span>
                  <p>Вставьте ссылку на картинку справа, чтобы увидеть превью</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label>Ссылка на картинку (URL)</label>
              <input 
                type="text" 
                placeholder="https://..." 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Название</label>
              <input 
                type="text" 
                placeholder="Добавить название" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea 
                placeholder="Добавьте подробное описание" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Board (Category)</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All</option>
                <option value="car">Car</option>
                <option value="art">Art</option>
                <option value="outfit">Outfit</option>
                <option value="wall">Wall</option>
                <option value="aesthetic">Aesthetic</option>
                <option value="home">Home</option>
                <option value="food">Food</option>
              </select>
            </div>

            <button type="submit" className="save-pin-btn">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPinForm;