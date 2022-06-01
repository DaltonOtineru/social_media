import { useDispatch } from 'react-redux';
import AppRouter from './components/App/AppRouter';
import { auth } from './firebase-config';
import { login, logout } from './redux/userSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
            userName: userAuth.userName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return <AppRouter />;
};

export default App;
