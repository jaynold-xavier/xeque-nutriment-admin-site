import React, { useEffect, useState, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { isLoaded, useFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import BackAnimation from './components/BackAnimation'
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

const Loading = () => {
  return <div
    style={{
      marginTop: '45vh',
      width: '100%',
      textAlign: 'center',
      fontSize: "1.5rem",
      position: 'absolute'
    }}>Loading...</div>;
}

const AuthIsLoaded = React.memo(({ children }) => {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return false;
  return children;
})

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const firebase = useFirebase();

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged(async user => {
      try{
        const url = process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT;
        if(firebase.auth().isSignInWithEmailLink(url)){
          const email = window.localStorage.getItem('emailForSignIn');
          await firebase.auth().signInWithEmailLink(email, url);
          window.localStorage.removeItem('emailForSignIn');
        }  
      } catch(err){
        console.log(err)
      }
      setUser(user);
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
      <BackAnimation/>
      <AuthIsLoaded>
        <Suspense fallback={<Loading />}>
          <Navbar user={user} />
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path="/" component={() => <Home/>}/>
              <Route path="/signup">
                {user?.emailVerified ?  <MotionRedirect to="/dashboard" /> :<Form title="Signup" />}
              </Route>
              <Route path="/login">
                {user?.emailVerified ? <MotionRedirect to="/dashboard" /> : <Form title="Login" /> }
              </Route>
              <Route path="/dashboard">
                {user?.emailVerified ? <Dashboard user={{displayName: user.displayName, email: user.email}} /> :<MotionRedirect to="/" /> }
              </Route>
              <Route path="*" component={() => <ErrorBoundary />}/>
            </Switch>
          </AnimatePresence>
        </Suspense>
      </AuthIsLoaded>
    </div>
  );
}

export default App;