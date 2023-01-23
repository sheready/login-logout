import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');
    if(storedUserLoggedInInfo === '1'){
      setIsLoggedIn(true)
    }
  },[])


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1')
    
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
   setIsLoggedIn(false)
    
  };

  return (
    <div className="App">
      {!isLoggedIn && <Login onLogin={loginHandler}/> }
      {isLoggedIn && <Home onLogout={logoutHandler} />}

    </div>
  );
}

export default App;
