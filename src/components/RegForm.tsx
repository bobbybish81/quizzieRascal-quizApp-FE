import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import '../styles/Forms.css';

const Register = () => {

  const navigate = useNavigate();

  const [registration, setRegistration] = useState({
    username: '',
    registered: false,
    alreadyRegistered: false,
  })

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (values:any) => {
    try {
      const response = await axios.post('https://quizzierascal.cyclic.app/register', values);
      setRegistration(response.data)
      setTimeout(() => navigate('/login'), 5000);
    }
    catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message)
    }
  }

  const formik = useFormik({
    initialValues: {
    username: '',
    email: '',
    password: '',
  },
    onSubmit,
  });

  console.log(registration)

  return (
    <>
      {!registration.registered ? 
          <form
            onSubmit={formik.handleSubmit}
            className='reg-form'>
            <p className='text-white pt-5'>Register with</p>
            <h1 className='text-white mb-5'>QUIZZIE RASCAL!</h1>
            <p className='text-white-50'>Please complete the form below</p>
            <div className='mx-auto px-5 mb-4'>
              <input
                className='w-100 p-2'
                type='text'
                name='username'
                placeholder='Add username'
                pattern='\S(.*\S)?'
                title='This field is required; no whitespace allowed'
                value={formik.values.username}
                onChange={formik.handleChange}
                autoComplete='off'
                maxLength={50}
                required/>
            </div>
            <div className='mx-auto px-5 mb-4'>
              <input
                className='w-100 p-2'
                type='email'
                name='email'
                placeholder='Add email address'
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete='off'
                maxLength={50}
                required/>
            </div>
            <div className='mx-auto px-5 mb-4'>
              <div className='password-div w-100 d-flex p-0 bg-white'>
                <input
                  className='w-100 p-2'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Add password'
                  pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                  title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  autoComplete='off'
                  maxLength={50}
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
              className='reg-btn'
              type='submit'>
              Register
            </button>
            <div className='text-white text-center mt-5 px-4'>
              <h6>Password must contain the following:</h6>
              <p className='message'>
                A <b>lowercase </b>letter; A <b>capital (uppercase)</b> letter; A <b>number</b>; Minimum <b>8 characters</b>
              </p>
            </div>
          </form> :
      <div className='mt-5 mx-auto'>
        <h2 className='text-white text-center mt-5'>{`Welcome to Quizzie Rascal ${registration.username}!`}</h2>
        <h4 className='text-white text-center'>You will be now redirected to the login page</h4>
      </div>}
    </>
  );
}

export default Register;