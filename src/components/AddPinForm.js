import React, { useState } from 'react';

const PIN_CATEGORIES = ['art', 'car', 'outfit', 'wall', 'aesthetic', 'home', 'food'];

function AddPinForm({ onAdd, onClose }) {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('art');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!imageUrl.trim() || !title.trim()) {
      setErrorMsg('Пожалуйста, добавьте ссылку на картинку и название!');
      return;
    }

    setIsSubmitting(true);
    const ok = await onAdd({
      image: imageUrl.trim(),
      title: title.trim(),
      description: description.trim(),
      category,
    });
    setIsSubmitting(false);

    if (ok === false) return;

    setImageUrl('');
    setTitle('');
    setDescription('');
    setCategory('art');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-pin-form-container">
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>
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
            {errorMsg && <p className="form-error">{errorMsg}</p>}
            <div className="form-group">
              <label>Ссылка на картинку (URL)</label>
              <input
                type="url"
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
              <label>Категория</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {PIN_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="save-pin-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPinForm;
