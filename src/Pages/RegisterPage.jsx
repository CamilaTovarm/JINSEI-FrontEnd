import MainLayout from '../Components/Layout/MainLayout';
import RegisterForm from '../Components/Forms/RegisterForm';

const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default RegisterPage;