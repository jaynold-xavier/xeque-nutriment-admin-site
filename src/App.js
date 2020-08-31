import React, { useEffect, useState, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { isLoaded, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

// pages
const Home = React.lazy(() => import('./components/Home'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Form = React.lazy(() => import('./components/Form'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return false;
  return children;
}

const MotionRedirect = ({ children, ...props }) => (
  <motion.div exit="undefined">
    <Redirect {...props} />
  </motion.div>
)

const Loading = () => {
  return <div 
    style={{
      marginLeft: '45vw',
      marginTop: '45vh',
      fontWeight: "bolder",
      fontSize: "1.5rem"
    }}>Loading...</div>;
}

function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();
  const firebase = useFirebase();
  
  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="App">
      <AuthIsLoaded>
        <Suspense fallback={<Loading/>}>
          <Navbar user={user} />
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/signup">
                {!user ? <Form title="Signup" /> : <MotionRedirect to="/dashboard" />}
              </Route>
              <Route path="/login">
                {!user ? <Form title="Login" /> : <MotionRedirect to="/dashboard" />}
              </Route>
              <Route path="/dashboard">
                {!user ? <MotionRedirect to="/" /> : <Dashboard user={user} />}
              </Route>
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </AuthIsLoaded>
    </div>
  );
}

export default App;