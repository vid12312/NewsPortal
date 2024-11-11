import React, { useState } from 'react'; 
import RegistrationPage from './component/RegistrationPage';
import LoginPage from "./component/LoginPage";
import ProfilePage from './component/ProfilePage';
import HomePage from './component/HomePage';
import ReadLaterPage from './component/ReadLaterPage';
import { CssBaseline, Button, Container, Box } from '@mui/material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('isLoggedIn')));
  const [hasAccount, setHasAccount] = useState(Boolean(localStorage.getItem('user')));
  const [viewProfile, setViewProfile] = useState(false);
  const [viewReadLater, setViewReadLater] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setViewProfile(false);
    setViewReadLater(false);
  };

  const handleRegister = () => {
    setHasAccount(true);
  };
  const goToHome = () => {
    setViewProfile(false);
    setViewReadLater(false);
  };
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: '50px' }}>
        
        {isLoggedIn && (
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Button
              onClick={() => {
                setViewProfile(true);
                setViewReadLater(false);
              }}
              color="primary"
              style={{ marginRight: 10 }}
            >
              View Profile
            </Button>
            <Button
              onClick={() => {
                setViewReadLater(!viewReadLater);
                setViewProfile(false);
              }}
              color="secondary"
            >
              {viewReadLater ? 'Back to Home' : 'View Read Later '}
            </Button>
          </Box>
        )}

        <Container maxWidth="sm" style={{ textAlign: 'center' }}>
          {isLoggedIn ? (
            viewProfile ? (
               <ProfilePage onLogout={handleLogout} goToHome={goToHome} /> 
            ) : viewReadLater ? (
              <ReadLaterPage />
            ) : (
              <HomePage />
            )
          ) : hasAccount ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <RegistrationPage onRegister={handleRegister} />
          )}
          
          {!isLoggedIn && (
            <Button
              onClick={() => setHasAccount(!hasAccount)}
              color="primary"
              style={{ marginTop: 20 }}
            >
              {hasAccount ? 'Create an Account' : 'Already have an Account?'}
            </Button>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default App;
