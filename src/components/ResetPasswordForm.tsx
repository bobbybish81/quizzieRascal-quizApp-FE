import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import axios, { AxiosError } from 'axios';
import '../styles/Forms.css';

const ResetPasswordForm = () => {

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successful, setSuccessful] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('token');

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.patch('https://quizzie-rascal-be-322fdaeb9a86.herokuapp.com/resetpassword', {
        token: token,
        password: newPassword
      });
      setSuccessful(true);
      setTimeout(() => navigate('/login'), 5000);
    }
    catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
        else if (err && err instanceof Error) setError(err.message)
    }
  }

  return (
    <>
    {!successful ?
    <form
      onSubmit={(e)=> resetPassword(e)}
      className='reset-form'>
      <CloseIcon
        className='close-icon'
        onClick={() => navigate('/')}/>
        <h2 className='text-white pt-5 mb-3'>QUIZZIE RASCAL</h2>
        <h6 className='text-white mb-5'>ADD NEW PASSWORD</h6>
        <p className='text-white-50'>Please enter your new password below</p>
      <div className='mx-auto px-5 mb-4'>
        <div className='password-div w-100 d-flex p-0 bg-white'>
        <input
          className='w-100 p-2'
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Add new password'
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
          value={newPassword}
          onChange={(e) => handleChange(e)}
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
      <div className='text-white text-center mt-1 px-4'>
        <h6>Password must contain the following:</h6>
        <p className='message'>
          A <b>lowercase </b>letter; A <b>capital (uppercase)</b> letter; A <b>number</b>; Minimum <b>8 characters</b>
        </p>
      </div>
      <button
        className='reset-btn'
        type='submit'>
        Reset Password
      </button>
    </form> :
    <h4 className='text-white text-center'>You will be now redirected to the login page</h4>}
    </>
  );
}

export default ResetPasswordForm;