import RegForm from '../components/RegForm';
import '../styles/Forms.css';

const Register = () => {

  return (
    <>
      <main className='form-mobile'>
        <RegForm/>
      </main>
      <main className='form-desktop'>
        <RegForm/>
      </main>
    </>

  );
}

export default Register;