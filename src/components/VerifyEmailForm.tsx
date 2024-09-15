import { useState, ChangeEvent, FormEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import '../styles/Forms.css';

const VerifyEmailForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const confirmUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVerifying(true)
    try {
      await axios.post('https://quizzie-rascal-be-322fdaeb9a86.herokuapp.com/verifyemail', {email: email});
      setVerifying(false);
      setSuccessful(true);
      setTimeout(() => navigate('/'), 5000);
    }
    catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
        setVerifying(false);
      }
        else if (err && err instanceof Error) setError(err.message)
    }
  }
  
  return (
    <>
     {!successful ? <form
        onSubmit={(e)=> confirmUser(e)}
        className='verify-form'>
        <CloseIcon
          className='close-icon'
          onClick={() => navigate('/')}/>
        <h2 className='text-white pt-5 mb-3'>QUIZZIE RASCAL</h2>
        <h6 className='text-white mb-5'>CONFIRM YOUR EMAIL ADDRESS</h6>
        <p className='text-white-50'>Please enter your email address below</p>
        <div className='mx-auto px-5 mb-4'>
          <input
            className='w-100 p-2'
            type='email'
            name='email'
            placeholder='Enter email address'
            value={email}
            onChange={(e) => handleChange(e)}
            required/>
        </div>
        {verifying ? 
        <div>
          <div className='verifying spinner-border' role='status'>
            <span className='sr-only'></span>
          </div>
          <p className='text-white mt-2'>Verifying</p>
        </div>:
        <button 
            className='confirm-btn'
            type='submit'>
            Confirm Email
        </button>}
        {error ? 
        <>
          <p className='error-message m-0 bolder'>{error}</p>
          <p className='error-message mt-4'>Try again or <Link
              to='/register'
              className='text-white bolder'>Register here
            </Link>
          </p>
        </> : null}
      </form> :
      <div>
        <h4 className='text-white text-center pt-5'>CHECK YOUR EMAIL</h4>
        <p className='text-white text-center'>{`We have sent password reset instructions to ${email}`}</p>
      </div>}
    </>
  );
}

export default VerifyEmailForm;