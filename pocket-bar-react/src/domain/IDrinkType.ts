
/**
 * Interface Represents Drink Type Data To Be Sent To And Received From Backend .
 */
 export interface IDrinkType {

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

    // Collection Counters Going Next.
    
    drinksCount?: number;
    
}