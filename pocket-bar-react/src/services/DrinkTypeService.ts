import { BaseService } from "./BaseService";

import type { IDrinkType } from "../domain/IDrinkType";


/**
 * Class Defines Drink Type Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class DrinkTypeService extends BaseService<IDrinkType> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("drinktype");
    }
}
