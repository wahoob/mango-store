import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { About, AuthForm, Cart, Home, Login, Mango, Signup } from './pages';
import { Footer, Header, StickyPrompt, Waiting } from './components';

export default function App() {
  const [showWaiting, setShowWaiting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowWaiting(true);
    const timer = setTimeout(() => {
      setShowWaiting(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {showWaiting && <Waiting />}
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mango/:id' element={<Mango />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-account' element={<AuthForm />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
        <Footer />
        <StickyPrompt />
      </div>
    </div>
  );
}
