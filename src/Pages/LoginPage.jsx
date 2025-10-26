import MainLayout from '../Components/Layout/MainLayout';
import LoginForm from '../Components/Forms/LoginForm';

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default LoginPage;