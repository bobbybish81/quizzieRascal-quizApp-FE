import VerifyEmailForm from '../components/VerifyEmailForm';
import '../styles/Forms.css';

const VerifyEmail = () => {

  return (
    <>
      <main className='form-mobile'>
        <VerifyEmailForm/>
      </main>
      <main className='form-desktop'>
        <VerifyEmailForm/>
      </main>
    </>

  );
}

export default VerifyEmail;