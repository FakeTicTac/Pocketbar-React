import { BaseService } from "./BaseService";

import type { IIngredient } from "../domain/IIngredient";


/**
 * Class Defines Ingredient Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class IngredientService extends BaseService<IIngredient> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("ingredient");
    }
}
