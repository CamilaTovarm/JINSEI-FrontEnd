import MainLayout from '../Components/Layout/MainLayout';
import HelpRequestForm from '../Components/Forms/HelpRequestForm';

const HelpRequestPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <HelpRequestForm />
      </div>
    </MainLayout>
  );
};

export default HelpRequestPage;