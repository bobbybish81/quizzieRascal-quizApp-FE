import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut, useAuthHeader } from 'react-auth-kit';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import PlayPanel from '../components/PlayPanel';
import Leaderboard from '../components/Leaderboard';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {

  const authHeader = useAuthHeader();

  const [leaderboard, setLeaderboard] = useState<ILeaderboard>({
    loading: false,
    userData: [],
    errorMessage: '',
  });

  useEffect(() => {
    setLeaderboard({...leaderboard, loading: true})
    const token = authHeader();
    const headers = {
      Authorization: token,
    }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://quizzierascal.cyclic.app/api/leaderboard', { headers: headers });
      setLeaderboard({
        ...leaderboard,
        loading: false,
        userData: response?.data,
      })
    } catch (error:any) {
      setLeaderboard({
          ...leaderboard,
          loading: false,
          errorMessage: error.message,
        })
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const signOut = useSignOut();
  
  const user = leaderboard?.userData.find(obj => obj.userId === localStorage.getItem('USER_ID'));

  const logout = async () => {

    const token = authHeader();
    const headers = {
      Authorization: token,
    }
    await axios.delete(`https://quizzierascal.cyclic.app/logout/${localStorage.getItem('USER_ID')}`, {
      headers: headers,
    });
    localStorage.removeItem('USER_ID');
    signOut();
    navigate('/')
  }

  return (
    <main className='homepage'>
      
      <>
        <PlayPanel user={user?.username}/>
        <div className='d-flex justify-content-center'>
          <p
            className='log-out mb-5'
            onClick={logout}>Log Out</p>
        </div>
        <Leaderboard leaderboard={leaderboard}/>
      </>
    </main>
    


  )
}

export default Home