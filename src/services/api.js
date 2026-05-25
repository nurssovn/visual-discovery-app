const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

async function request(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    const error = new Error('Ошибка сервера');
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

export const apiService = {
  getPins: () => request('/pins'),

  createPin: (pinData) =>
    request('/pins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pinData),
    }),

  deletePin: (id) => request(`/pins/${id}`, { method: 'DELETE' }),

  updatePin: (id, updatedData) =>
    request(`/pins/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    }),
};
