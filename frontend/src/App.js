import './App.css';
import Home from './Components/Home';
import Filter from './Components/Filter';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import RestaurantDetails from './Components/RestaurantDetails';
import Nomatch from './Components/Nomatch';
import Profile from './Components/Profile';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Profile></Profile>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/restaurantDetails/:rName"
            element={<RestaurantDetails />}
          ></Route>
          <Route path="/filter" element={<Filter />}></Route>
          <Route path="/notfound" element={<Nomatch />}></Route>

          <Route
            path="/*"
            element={<Navigate replace to="/notfound" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
