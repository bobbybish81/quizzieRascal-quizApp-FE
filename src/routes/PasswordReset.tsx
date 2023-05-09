import ResetPasswordForm from '../components/ResetPasswordForm';
import '../styles/Forms.css';

const ResetPassword = () => {

  return (
    <>
      <main className='form-mobile'>
        <ResetPasswordForm/>
      </main>
      <main className='form-desktop'>
        <ResetPasswordForm/>
      </main>
    </>

  );
}

export default ResetPassword;