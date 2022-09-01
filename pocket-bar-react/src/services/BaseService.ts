import httpRequest from "../http-request";


import type { AxiosError } from "axios";
import type { IFetchResponce } from "../types/IFetchResponse";

import { IdentityService } from "./Identity/IdentityService";
import { IJWTResponse } from "../domain/Identity/IJwtResponse";


/**
 * Class Defines Basic Operations With Backend. (Connect And Retreive Data)
 */
export class BaseService<TEntity> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor(private path: string) {}

  
    /**
    * Method Puts Data Into Backends' Database Layer.
    * @param entity Defines Data To Be Inserted In Database.
     * @param {IJWTResponse | null} jwt Defines JWT Token Of User. 
    * @returns {Promise<IFetchResponce<TEntity>>} Response From API.
     */
    async add(entity : TEntity, jwt: IJWTResponse | null) : Promise<IFetchResponce<TEntity>> {

        let response;

        // Manage Errors Sent From Backend.
        try {

            response = await httpRequest.post(`/${this.path}`, entity, {
                headers: {  // Manage Authorization Of The Data.
                    "Authorization": `bearer ${jwt?.tokenValue}`
                }
            });

        } catch (error) {

            // Check If Error Occured Because of Refresh Token.
            if ((error as AxiosError).response!.status == 401 && jwt) {

                // Try To Refresh Token.
                let newJwt = await this.tokenRefreser(jwt);

                // Token Is Not Refreshed.
                if (!newJwt) {

                    return {
                        statusCode: (error as AxiosError).response!.status,
                        errorMessage: (error as AxiosError).response!.data as string
                    };
                } 

                // Access Data Again.
                response = await httpRequest.post(`/${this.path}`, entity, {
                    headers: {  // Manage Authorization Of The Data.
                        "Authorization": `bearer ${newJwt.tokenValue}`
                    }
                });

                return { 
                    statusCode: response.status,
                    data: response.data,
                    newJwt: newJwt
                };
            }

            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string
            };
        } 
       
        return { 
            statusCode: response.status,
            data: response.data
         };
    }

    /**
     * Method Updates Data In Backends' Database Layer.
     * @param {string} id Defines Record ID To Be Updated.
     * @param entity Defines Data To Be Updated In Database.
     * @param {IJWTResponse | null} jwt Defines JWT Token Of User. 
     * @returns {Promise<IFetchResponce<TEntity>>} Response From API.
     */
    async update(id : string, entity : TEntity, jwt : IJWTResponse | null) : Promise<IFetchResponce<TEntity>> {

        let response;

        // Manage Errors Sent From Backend.
        try {

            response = await httpRequest.put(`/${this.path}/${id}`, entity, {
                headers: {  // Manage Authorization Of The Data.
                    "Authorization": `bearer ${jwt?.tokenValue}`
                }
            });

        } catch (error) {

            // Check If Error Occured Because of Refresh Token.
            if ((error as AxiosError).response!.status == 401 && jwt) {

                // Try To Refresh Token.
                let newJwt = await this.tokenRefreser(jwt);

                // Token Is Not Refreshed.
                if (!newJwt) {
                    
                    return {
                        statusCode: (error as AxiosError).response!.status,
                        errorMessage: (error as AxiosError).response!.data as string
                    };
                }

                // Access Data Again.
                response = await httpRequest.put(`/${this.path}/${id}`, entity, {
                    headers: {  // Manage Authorization Of The Data.
                        "Authorization": `bearer ${newJwt.tokenValue}`
                    }
                });

                return { 
                    statusCode: response.status,
                    newJwt: newJwt
                };
            }

            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string
            };
        } 

        return { statusCode: response.status };
    }

    /**
     * Method Removes One Record From Backends' Database Layer.
     * @param {string} id Defines Record ID To Be Removed.
     * @param {IJWTResponse | null} jwt Defines JWT Token Of User. 
     * @returns {Promise<IFetchResponce<TEntity>>} Response From API.
     */
    async remove(id : string, jwt : IJWTResponse | null) : Promise<IFetchResponce<TEntity>> {

        let response;

        // Manage Errors Sent From Backend.
        try {

            response = await httpRequest.delete(`/${this.path}/${id}`, {
                headers: {  // Manage Authorization Of The Data.
                    "Authorization": `bearer ${jwt?.tokenValue}`
                }
            });

        } catch (error) {

            // Check If Error Occured Because of Refresh Token.
            if ((error as AxiosError).response!.status == 401 && jwt) {

                // Try To Refresh Token.
                let newJwt = await this.tokenRefreser(jwt);

                // Token Is Not Refreshed.
                if (!newJwt) {

                    return {
                        statusCode: (error as AxiosError).response!.status,
                        errorMessage: (error as AxiosError).response!.data as string
                    };
                } 

                // Access Data Again.
                response = await httpRequest.delete(`/${this.path}/${id}`, {
                    headers: {  // Manage Authorization Of The Data.
                        "Authorization": `bearer ${newJwt.tokenValue}`
                    }
                });

                return { 
                    statusCode: response.status,
                    newJwt: newJwt
                 };
            }

            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string
            };
        } 

        return { statusCode: response.status };
    }

    /**
     * Method Gets All Records From Backends' Database Layer.
     * @param {IJWTResponse | null} jwt Defines JWT Token Of User. 
     * @returns {Promise<IFetchResponce<TEntity>>} Response From API.
     */
    async getAll(jwt: IJWTResponse | null) : Promise<IFetchResponce<TEntity[]>> {
        
        let response;

        // Manage Errors Sent From Backend.
        try {

            response = await httpRequest.get(`/${this.path}`, {
                headers: {  // Manage Authorization Of The Data.
                    "Authorization": `bearer ${jwt?.tokenValue}`
                }
            });

        } catch (error) {

            // Check If Error Occured Because of Refresh Token.
            if ((error as AxiosError).response!.status == 401 && jwt) {

                // Try To Refresh Token.
                let newJwt = await this.tokenRefreser(jwt);

                // Token Is Not Refreshed.
                if (!newJwt) {

                    return {
                        statusCode: (error as AxiosError).response!.status,
                        errorMessage: (error as AxiosError).response!.data as string
                    };
                } 

                // Access Data Again.
                response = await httpRequest.get(`/${this.path}`, {
                    headers: {  // Manage Authorization Of The Data.
                        "Authorization": `bearer ${newJwt.tokenValue}`
                    }
                });

                return { 
                    statusCode: response.status,
                    data: response!.data,
                    newJwt: newJwt
                };
            }

            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string
            };
        } 

        return { 
            statusCode: response.status,
            data: response!.data
        };
    }

    /**
     * Method Gets One Record From Backends' Database Layer.
     * @param {string} id Defines Record ID To Search For.
     * @param {IJWTResponse | null} jwt Defines JWT Token Of User. 
     * @returns {Promise<IFetchResponce<TEntity>>} Response From API.
     */
    async get(id : string, jwt: IJWTResponse | null) : Promise<IFetchResponce<TEntity>> {

        let response;

        // Manage Errors Sent From Backend.
        try {

            response = await httpRequest.get(`/${this.path}/${id}`, {
                headers: {  // Manage Authorization Of The Data.
                    "Authorization": `bearer ${jwt?.tokenValue}`
                }
            });

        } catch (error) {

            // Check If Error Occured Because of Refresh Token.
            if ((error as AxiosError).response!.status == 401 && jwt) {
                      
                // Try To Refresh Token.
                let newJwt = await this.tokenRefreser(jwt);

                // Token Is Not Refreshed.
                if (!newJwt) {

                    return {
                        statusCode: (error as AxiosError).response!.status,
                        errorMessage: (error as AxiosError).response!.data as string
                    };
                } 

                // Access Data Again.
                response = await httpRequest.get(`/${this.path}/${id}`, {
                    headers: {  // Manage Authorization Of The Data.
                        "Authorization": `bearer ${newJwt.tokenValue}`
                    }
                });

                return { 
                    statusCode: response.status,
                    data: response!.data,
                    newJwt: newJwt
                };
            }

            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string
            };
        } 

        return { 
            statusCode: response.status,
            data: response!.data
        };
    }


    // Helping Methods.


    /**
     * Method Refreshes Tokens In Identity Storage.
     * @param {IJWTResponse} jwt JWT Token To Be Updated 
     * @returns Updated JWT Token or Null In Case Of Error.
     */
    async tokenRefreser(jwt: IJWTResponse) {
        
        // Define Identity Service For Token Refreshment And Refresh It.
        let identityService = new IdentityService();

        let refreshTokenResponse = await identityService.refreshIdentity(jwt);
        return refreshTokenResponse.data === undefined ? null : refreshTokenResponse.data;
    }
}
