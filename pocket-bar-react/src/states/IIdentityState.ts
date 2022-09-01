import { IJWTResponse } from "../domain/Identity/IJwtResponse";


/**
 * Defines Storage Of User Data - JWT Token For Authorization.
 */
export interface IIdentityState {

    jwt: IJWTResponse | null

    setJwt: (jwt: IJWTResponse | null) => void  // Defines Method To Setup JWT
}
