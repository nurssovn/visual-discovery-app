# Visual Discovery App

Веб-приложение для поиска, категоризации и сохранения визуального контента (аналог moodboard / Pinterest).

## Tech Stack

- React 19 + React Router v7
- Context API (`AuthContext`, `AppContext`)
- Custom hooks: `useAuth`, `useLocalStorage`
- json-server (mock REST API)
- Jest + React Testing Library
- CSS variables (light / dark theme)

## Features

- Masonry-лента пинов с поиском и фильтрацией (`useMemo` + `filterPins` util)
- CRUD через REST API (GET, POST, PUT, DELETE)
- Auth: регистрация, вход, выход (`localStorage`)
- Protected routes + nested profile routes:
  - `/profile/saved` — сохранённые пины
  - `/profile/created` — пины, созданные пользователем
- `authorId` — удалять можно только свои пины
- Error Boundary, lazy-loaded pages (`React.lazy`)
- Глобальный toast, confirm перед удалением

## Setup

```bash
npm install
cp .env.example .env
```

**Терминал 1 — API:**

```bash
npm run server
```

**Терминал 2 — приложение:**

```bash
npm start
```

Откройте [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5001` | URL json-server |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server |
| `npm run server` | json-server :5001 |
| `npm run build` | Production build |
| `npm test` | Tests (watch mode) |
| `npm run test:ci` | Tests (CI, no watch) |

## Tests

```bash
npm run test:ci
```

Покрытие: `useAuth`, `filterPins`, `ProtectedRoute`, `AddPinForm`, `apiService` (15+ assertions).

## Deploy

### Frontend (Vercel / Netlify)

1. Push repo to GitHub
2. Import project on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`
5. Environment variable: `REACT_APP_API_URL` = URL вашего API

Конфиги уже в репозитории: `vercel.json`, `netlify.toml`.

### API (Render / Railway)

json-server нужно деплоить отдельно:

```bash
# Пример для Render: Start Command
npx json-server --watch db.json --host 0.0.0.0 --port $PORT
```

После деплоя API укажите публичный URL в `REACT_APP_API_URL` на Vercel.

**Локальная демонстрация на защите:** запустите `npm run server` + `npm start` — этого достаточно.

## Project Structure

```
src/
  components/     # UI (PinCard, ErrorBoundary, …)
  pages/          # Routes (Home, PinDetail, ProfileLayout)
  context/        # AuthContext, AppContext
  hooks/          # useAuth, useLocalStorage
  services/       # api.js
  utils/          # storage, filterPins
```

## Defense Talking Points

- **Context vs Redux:** мало глобального state → Context достаточно
- **Custom hook `useAuth`:** инкапсулирует auth + storage, без пароля в session
- **useEffect cleanup:** toast timer в `AppContext`
- **API error demo:** остановите `npm run server` → на главной появится ошибка + «Повторить»
- **Nested routes:** ProfileLayout + `<Outlet />` для saved/created

## Notes

- Auth — client-side mock для учебного проекта
- Sidebar Messages/Notifications — toast «скоро»
