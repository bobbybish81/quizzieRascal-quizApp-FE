import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [error, setError] = useState<string>('');

  const onSubmit = async (values:any) => {
    try {
      const response = await axios.post('http://localhost:8080/register', values);
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
              <p className='text-white mt-5'>Register with</p>
              <h1 className='text-white mb-5'>QUIZZIE RASCAL!</h1>
              <p className='text-white-50'>Please complete the form below</p>
              <div className='mx-auto px-5 mb-4'>
                <input
                  className='w-100 p-2'
                  type='text'
                  name='username'
                  placeholder='Add username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
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
                  required/>
              </div>
              <div className='mx-auto px-5 mb-4'>
                <input
                  className='w-100 p-2'
                  type='password'
                  name='password'
                  placeholder='Add password'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required/>
              </div>
              <p className='error-message m-0'>{error}</p>
              <button
                className='reg-btn'
                type='submit'>
                Register
              </button>
            </form> :
      <div className='mt-5 mx-auto'>
        <h2 className='text-white text-center mt-5'>{`Welcome to Quizzie Rascal ${registration.username}!`}</h2>
        <h4 className='text-white text-center'>You will be now redirected to the login page</h4>
      </div>}
    </>
  );
}

export default Register;