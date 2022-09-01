import { BaseService } from "./BaseService";

import type { ICocktail } from "../domain/ICocktail";


/**
 * Class Defines Cocktail Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class CocktailService extends BaseService<ICocktail> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("cocktail");
    }
}
