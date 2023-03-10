import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useFormik } from 'formik';
import '../styles/Forms.css';

const LoginForm = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const signIn: (obj:any) => boolean = useSignIn();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (values:any) => {
    try {
      const response = await axios.post('https://quizzierascal.cyclic.app/login', values);
      signIn({
        token: response?.data.token,
        expiresIn: 86400,
        tokenType: 'Bearer',
        authState: { email: values.email},
      })
      if (!localStorage.getItem('USER_ID')) {
        localStorage.setItem('USER_ID', response?.data.user)
      }
      navigate('/home')
    }
    catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message)
    }
  }

  const formik = useFormik({
    initialValues: {
    email: '',
    password: ''
  },
    onSubmit,
  });

  return (
        <form
          onSubmit={formik.handleSubmit}
          className='login-form'>
          <CloseIcon
            className='close-icon'
            onClick={() => navigate('/')}/>
          <p className='text-white pt-5'>Welcome to</p>
          <h2 className='text-white mb-5'>QUIZZIE RASCAL</h2>
          <p className='text-white-50'>Please enter your email and password!</p>
          <div className='mx-auto px-5 mb-4'>
            <input
              className='w-100 p-2'
              type='email'
              name='email'
              placeholder='Enter email'
              value={formik.values.email}
              onChange={formik.handleChange}
              required/>
          </div>
          <div className='mx-auto px-5 mb-4'>
            <div className='password-div w-100 d-flex p-0 bg-white'>
              <input
                className='password w-100 p-2 m-0'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Enter password'
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete='off'
                required/>
                <IconButton
                  className='py-0' 
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </div>
          </div>
          <p className='error-message m-0'>{error}</p>
          <button
            className='login-btn'
            type='submit'>
            Login
          </button>
          <p className='text-white-50'>Don't have an account? <Link
              to='/register'
              className='text-white bolder'>Register
            </Link>
          </p>
        </form>
  );
}

export default LoginForm