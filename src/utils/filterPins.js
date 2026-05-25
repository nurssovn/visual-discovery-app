export function filterPins(pins, { searchTerm = '', activeCategory = 'all', username = null } = {}) {
  const query = searchTerm.trim().toLowerCase();

  return pins.filter((pin) => {
    if (!pin.image) return false;

    const matchesSearch = pin.title.toLowerCase().includes(query);

    if (activeCategory === 'saved') {
      const isSavedByMe = pin.savedBy && username && pin.savedBy.includes(username);
      return isSavedByMe && matchesSearch;
    }

    const matchesCategory = activeCategory === 'all' || pin.category === activeCategory;
    return matchesCategory && matchesSearch;
  });
}

export function canDeletePin(pin, username) {
  if (!pin?.authorId) return true;
  if (!username) return false;
  return pin.authorId === username;
}
