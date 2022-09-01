import httpRequest from "../../http-request";

import type { AxiosError } from "axios";
import type { ILogin } from "../../domain/Identity/ILogin";
import type { IFetchResponce } from "../../types/IFetchResponse";
import type { IRegister } from "../../domain/Identity/IRegister";
import type { IJWTResponse } from "../../domain/Identity/IJwtResponse";


/**
 * Class Defines Identity Operations With Backend. (Connect And Retreive Data)
 */
export class IdentityService {

    /**
     * Method Allows User To Login Into System.
     * @param {ILogin} login Defines Login Data.
     * @returns {Promise<IFetchResponce<IJWTResponse>>} Response From API.
     */
    async login(login: ILogin): Promise<IFetchResponce<IJWTResponse>> {
        return this.fetchData("login", login);
    }

    /**
     * Method Allows User To Register Into System.
     * @param {IRegister} register Defines Register Data
     * @returns {Promise<IFetchResponce<IJWTResponse>>} Response From API.
     */
    async register(register: IRegister) {
        return this.fetchData("register", register);
    }

    /**
     * Method Refreshes Users Token To Access Backend.
     * @returns {Promise<IFetchResponce<IJWTResponse>>} Response From API.
     */
    async refreshIdentity(jwt: IJWTResponse): Promise<IFetchResponce<IJWTResponse>> {
        return this.fetchData("refreshtoken", {
            tokenValue: jwt.tokenValue as string,
            refreshTokenValue: jwt.refreshTokenValue as string,
        });
    }


    // Helping Methods.


    /**
     * Method Allows To Create Identity Related Fetch To Backend.
     * @param {string} path Defines Action Method In Backend Identity Controller.
     * @param {ILogin | IRegister | IJWTResponse} parseObj Defines Object To Be Sent To Backend.
     * @returns {Promise<IFetchResponce<IJWTResponse>>} Response From API.
     */
    async fetchData(path: string, parseObj: ILogin | IRegister | IJWTResponse): Promise<IFetchResponce<IJWTResponse>> {

        let response;

        // Try To Refresh Token.
        try {

            response = await httpRequest.post(`/identity/account/${path}`, parseObj);

            return {
                statusCode: response.status,
                data: response.data as IJWTResponse
            }
        } catch (error) {
            
            return {
                statusCode: (error as AxiosError).response!.status,
                errorMessage: (error as AxiosError).response!.data as string

            }
        }
    }
}