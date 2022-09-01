
/**
 * Interface Represents Drink In Cocktail Data To Be Sent To And Received From Backend .
 */
 export interface IDrinkInCocktail {

    id?: string;
    amount: number;
    cocktailId: string;
    amountUnitId: string;
    drinkId: string;

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
    cocktailName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    
}