
/**
 * Interface Represents Ingredient Data To Be Sent To And Received From Backend .
 */
 export interface IIngredient {

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
    coverImagePath?: string;

    // Collection Counters Going Next.
    
    ingredientInCocktailsCount?: number;
    
    // Client Selection Field.
    
    isSelected?: boolean;

}