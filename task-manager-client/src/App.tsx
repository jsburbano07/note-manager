import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/LeftBar';
import AuthService from './services/auth.service';
import './App.scss';
import { Paths } from './enums';
import { useAppDispatch } from './hooks/redux.hook';
import { fetchLogout } from './store/thunks/auth.thunk';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const loader = useSelector((state: RootState) => state.ui.loader)
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(fetchLogout());
      location.reload();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated: boolean = await AuthService.verifyToken();
        setAuthenticated(isAuthenticated);
      } catch (error) {
        console.error('Error verifying authentication:', error);
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return <Loader/>;
  }

  if (!authenticated) {
    return <Navigate to={Paths.login} replace />;
  }

  return (
    <>
        {loader && <Loader/>}
      <div className="app-viewport">
        <Navbar handleLogout={handleLogout} />
        <main className="app-viewport__template">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
