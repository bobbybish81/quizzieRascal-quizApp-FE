import { Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import Error from "./routes/Error";
import Login from './routes/Login';
import ResetPassword from './routes/ResetPassword';
import Register from './routes/Register';
import Home from './routes/Home';
import Quiz from './routes/Quiz';
import { RequireAuth } from "react-auth-kit";

const App = () => {

  return(
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/resetpassword'} element={<ResetPassword/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/*'} element={<Error/>}/>
        <Route path={'/home'} element={
          <RequireAuth loginPath={'/login'}>
            <Home/>
          </RequireAuth>}/>
        <Route path={'/quiz'} element={
          <RequireAuth loginPath={'/login'}>
            <Quiz/>
          </RequireAuth>}/>
    </Routes>
  )
};

export default App