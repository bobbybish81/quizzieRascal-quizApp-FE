import { useState, ChangeEvent, FormEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IUser from '../interfaces/IUser';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import '../styles/Forms.css';

interface EmailProps {
  user: IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
}

const EmailForm = ({ user, setUser } : EmailProps) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const confirmUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.get(`https://quizzierascal.cyclic.app/resetpassword/${email}`);
      const response = await axios.post('http://localhost:8080/resetpassword', {email: email});
      setUser({
        ...user,
        username: response.data.username,
        email: response.data.email,
        message: response.data.message
      })
    }
    catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message)
    }
  }

  console.log('user:', user)

  console.log('email:', email)

  return (
     <form
        onSubmit={(e)=> confirmUser(e)}
        className='reset-form'>
        <CloseIcon
          className='close-icon'
          onClick={() => navigate('/')}/>
        <h2 className='text-white mt-5 mb-3'>QUIZZIE RASCAL</h2>
        <h6 className='text-white mb-5'>PASSWORD RESET</h6>
        <p className='text-white-50'>Please confirm your email address</p>
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
        <button
            className='confirm-btn'
            type='submit'>
            Confirm Email
          </button>
        {error ? <p className='error-message m-0'>{`${error} `}
          <Link
            to='/register'
            className='text-white bolder'>Register here
          </Link>
        </p>: null}
      </form>
  );
}

export default EmailForm;