import React from 'react';

import { IIdentityState } from '../states/IIdentityState';
import { IJWTResponse } from '../domain/Identity/IJwtResponse';


/**
 * Defines State Of User Token - Authorization/
 */
export const identityContext : IIdentityState = {
    
    jwt: null,

    setJwt: (jwt: IJWTResponse | null) => {}  // Method To Setup JWT Token
};

// Create Actual State.
export const IdentityAppContext = React.createContext<IIdentityState>(identityContext);
export const AppContextProvider = IdentityAppContext.Provider;
