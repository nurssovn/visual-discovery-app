export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}

export function readStorageString(key, fallback = '') {
  return localStorage.getItem(key) ?? fallback;
}

export function writeStorageString(key, value) {
  localStorage.setItem(key, value);
}
