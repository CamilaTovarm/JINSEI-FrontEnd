import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/authContext';
import { ChatProvider } from './Context/chatContext';
import { useAuth } from './Hooks/useAuth';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ChatPage from './Pages/ChatPage';
import HelpRequestPage from './pages/HelpRequestPage';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

// Componente para redirigir si ya está autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />

      {/* Rutas privadas */}
      <Route 
        path="/chat" 
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/help-request" 
        element={
          <PrivateRoute>
            <HelpRequestPage />
          </PrivateRoute>
        } 
      />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;