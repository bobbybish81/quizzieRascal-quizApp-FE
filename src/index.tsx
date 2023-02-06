import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AuthProvider>
);
