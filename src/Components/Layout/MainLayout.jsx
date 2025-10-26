import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {children || <Outlet />}
    </div>
  );
};

export default MainLayout;