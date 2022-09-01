
/**
 * Interface Represents Step Data To Be Sent To And Received From Backend .
 */
 export interface IStep {

    id?: string;
    indexNumber: number;
    description: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    cocktailId: string;

    // Full Data Fields Going Next.

    cocktailName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    
}