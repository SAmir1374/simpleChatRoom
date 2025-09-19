// App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

function App() {
  return (
    <Routes>
      {/* صفحات Auth */}
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* صفحات اصلی */}
      <Route
        path="/*"
        element={<HomePage />}
      />
    </Routes>
  );
}

export default App;
