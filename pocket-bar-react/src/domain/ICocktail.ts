import type { IStep } from "./IStep";
import type { IDrinkInCocktail } from "./IDrinkInCocktail";
import type { IIngredientInCocktail } from "./IIngredientInCocktail";


/**
 * Interface Represents Cocktail Data To Be Sent To And Received From Backend .
 */
 export interface ICocktail {

    id?: string;
    name: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    description?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    isAlcoholic: boolean;
    coverImagePath?: string;

    // Collection Counters Going Next.

    stepsCount?: number;
    usersCount?: number;
    drinkInCocktailsCount?: number;
    ingredientInCocktailsCount?: number;

    // Full Data Fields Going Next.

    steps?: IStep[];
    drinksInCocktails?: IDrinkInCocktail[];
    ingredientInCocktails?: IIngredientInCocktail[];

}