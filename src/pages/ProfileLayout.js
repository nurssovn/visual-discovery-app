import React, { useContext, useState, useMemo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';

function ProfileLayout() {
  const { user, updateProfile } = useAuthContext();
  const { pins, showToast } = useContext(AppContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
  });

  const savedCount = useMemo(
    () => pins.filter((pin) => pin.savedBy?.includes(user?.username)).length,
    [pins, user?.username]
  );

  const createdCount = useMemo(
    () => pins.filter((pin) => pin.authorId === user?.username).length,
    [pins, user?.username]
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const result = updateProfile(editFormData);
    if (result.success) {
      setIsEditModalOpen(false);
      showToast('Профиль успешно обновлён');
    } else {
      showToast(result.message);
    }
  };

  if (!user) {
    return <div className="page-message profile-guest-message">Пожалуйста, войдите в аккаунт</div>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-bg-glow-1" />

      <div className="profile-top-section">
        <div className="profile-info-left">
          <div className="profile-user-header">
            <img src={user.avatar} alt="avatar" className="profile-avatar-large" />
            <div className="profile-name-block">
              <h1>{user.name}</h1>
              <p className="profile-handle">{user.username}</p>
            </div>
          </div>

          <div className="profile-bio">
            {user.bio || 'Добавьте описание в настройках профиля.'}
          </div>

          <div className="profile-buttons-row">
            <button
              type="button"
              className="btn-profile-action"
              onClick={() => setIsEditModalOpen(true)}
            >
              Редактировать профиль
            </button>
            <button
              type="button"
              className="btn-profile-action"
              onClick={() => showToast('Ссылка на профиль скопирована (демо)')}
            >
              Поделиться
            </button>
          </div>
        </div>

        <div className="profile-right-actions">
          <div className="profile-stats-right">
            <div className="stat-item">
              <span className="stat-number">{savedCount}</span>
              <span className="stat-label">Сохранённых</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{createdCount}</span>
              <span className="stat-label">Созданных</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-divider" />

      <nav className="profile-tabs">
        <NavLink
          to="/profile/saved"
          className={({ isActive }) => `profile-tab ${isActive ? 'active' : ''}`}
        >
          Сохранённые
        </NavLink>
        <NavLink
          to="/profile/created"
          className={({ isActive }) => `profile-tab ${isActive ? 'active' : ''}`}
        >
          Мои пины
        </NavLink>
      </nav>

      <div className="profile-content-center">
        <Outlet />
      </div>

      {isEditModalOpen && (
        <div className="edit-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="edit-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-close-modal"
              onClick={() => setIsEditModalOpen(false)}
            >
              ✕
            </button>
            <div className="edit-modal-content edit-modal-content--full">
              <h2>Редактирование профиля</h2>
              <form onSubmit={handleSaveProfile}>
                <div className="edit-form-group">
                  <label>Имя пользователя</label>
                  <div className="edit-input-wrapper">
                    <input
                      type="text"
                      className="edit-form-input"
                      value={editFormData.username}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, username: e.target.value })
                      }
                    />
                    <img
                      src={editFormData.avatar || user.avatar}
                      alt="preview"
                      className="edit-avatar-preview"
                    />
                  </div>
                </div>
                <div className="edit-form-group">
                  <label>Полное имя</label>
                  <input
                    type="text"
                    className="edit-form-input edit-form-input--full"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>
                <div className="edit-form-group">
                  <label>URL аватара</label>
                  <input
                    type="url"
                    className="edit-form-input edit-form-input--full"
                    placeholder="https://example.com/avatar.jpg"
                    value={editFormData.avatar}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, avatar: e.target.value })
                    }
                  />
                </div>
                <div className="edit-form-group">
                  <label>Bio</label>
                  <textarea
                    className="edit-form-input edit-form-input--textarea"
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  />
                </div>
                <button type="submit" className="edit-save-btn">
                  Сохранить изменения
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileLayout;
