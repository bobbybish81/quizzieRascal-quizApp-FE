import { Routes, Route, Navigate } from "react-router-dom";
import Login from './routes/Login';
import Register from './routes/Register';
import Home from './routes/Home';
import Quiz from './routes/Quiz';
// import { RequireAuth } from "react-auth-kit";

const App = () => {

  return(
    <Routes>
      <Route path="/" element={<Navigate to='login'/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={`/home`} element={<Home/>}/>
        <Route path={`/quiz`} element={<Quiz/>}/>
    </Routes>
  )
};

export default App
