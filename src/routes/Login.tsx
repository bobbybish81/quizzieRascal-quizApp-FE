import LoginForm from '../components/LoginForm';
import '../styles/Forms.css';

const Login = () => {

  return (
    <>
      <main className='form-mobile'>
        <LoginForm/>
      </main>
      <main className='form-desktop'>
        <LoginForm/>
      </main>
    </>

  );
}

export default Login;