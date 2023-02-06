import RegForm from '../components/RegForm';
import '../styles/Forms.css';

const Register = () => {

  return (
    <>
      <main className='form-mobile flex-column justify-content-center'>
        <RegForm/>
      </main>
      <main className='form-desktop flex-column justify-content-center'>
        <RegForm/>
      </main>
    </>

  );
}

export default Register;