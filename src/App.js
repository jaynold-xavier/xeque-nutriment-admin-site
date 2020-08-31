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
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary'));

const MotionRedirect = ({ ...props }) => (
  <motion.div exit="undefined">
    <Redirect {...props} />
  </motion.div>
)

const Loading = React.memo(() => {
  return <div 
    style={{
      marginLeft: '45vw',
      marginTop: '45vh',
      fontWeight: "bolder",
      fontSize: "1.5rem",
      color: "lightcoral"
    }}>Loading...</div>;
})

const AuthIsLoaded = React.memo(({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return false;
  return children;
})

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
        <ErrorBoundary>
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
              </Route>
            </Switch>
          </AnimatePresence>
        </ErrorBoundary>
        </Suspense>
      </AuthIsLoaded>
    </div>
  );
}

export default App;