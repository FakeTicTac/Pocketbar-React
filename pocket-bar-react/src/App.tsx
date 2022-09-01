import React, { useState } from 'react';

import { Route, Routes } from "react-router-dom";

import { IJWTResponse } from './domain/Identity/IJwtResponse';
import { AppContextProvider, identityContext } from './context/AppContext';

// Page Imports

// Landing Page And Home
import Home from './components/home/Home';
import Landing from './components/landing/Landing';

// Identity Pages
import Login from './components/identity/Login';
import Register from './components/identity/Register';

// Data Pages
import Cocktails from './components/cocktails/Cocktails';
import CocktailDetails from './components/cocktails/CocktailDetails';

// Admin Related
import Adminpanel from './components/admin/AdminPanel';
import DrinkType from './components/admin/drinktype/DrinkType';
import Ingredient from './components/admin/ingredient/Ingredient';
import DrinkTypeAdd from './components/admin/drinktype/DrinkTypeAdd';
import IngredientAdd from './components/admin/ingredient/IngredientAdd';

import Page404 from './components/404/Page404';


// Application Startup (Main Entry)
export const App = () => {


  const setJwt = (jwt: IJWTResponse | null) => setIdentityState({ ...identityState, jwt });

  const [identityState, setIdentityState] = useState({ ...identityContext, setJwt });


  return (
    <>
      <AppContextProvider value={identityState}>

        <Routes>
          <Route index element={<Landing />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/home" element={<Home />} /> 

          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="cocktail/details/:id" element={<CocktailDetails />} />

          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/drink-types" element={<DrinkType />} />
          <Route path="/ingredients" element={<Ingredient />} />

          <Route path="/ingredient/create/" element={<IngredientAdd />} />    
          <Route path="/ingredient/edit/:id" element={<IngredientAdd />} />    
          <Route path="/drinktype/create/" element={<DrinkTypeAdd />} />
          <Route path="/drinktype/edit/id=:id" element={<DrinkTypeAdd />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
        
      </AppContextProvider>
    </>
    
  );
} 


export default App;
