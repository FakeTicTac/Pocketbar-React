
/**
 * Interface Represents Ingredient In Cocktail Data To Be Sent To And Received From Backend .
 */
 export interface IIngredientInCocktail {

    id?: string;
    amount: number;
    cocktailId: string;
    amountUnitId: string;
    ingredientId: string;

    // Full Data Fields Going Next.

    drinkName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    amountUnitName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    ingredientName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    
}