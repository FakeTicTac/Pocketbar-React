import { useContext, useEffect, useState } from 'react';

import { ICocktail } from '../../domain/ICocktail';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityAppContext } from '../../context/AppContext';
import { CocktailService } from '../../services/CocktailService';

import NavBar from '../NavBar';

import styles from "./CocktailDetails.module.css";

/**
 * Cocktail Details Page View Component.
 * @returns {JSX.Element} View Of The Cocktail Details Page.
 */
const CocktailDetails = (): JSX.Element => {

    /**
     * Defines Passed Parameters.
     */
    let { id } = useParams()

    /**
     * Defines Rounting Connection.
     */
    let navigate = useNavigate();

    /**
     * Defines Identity State Connection
     */
    let identityState = useContext(IdentityAppContext);

    /**
     * Defines Cocktails Service Connection.
     */
    let cocktailService = new CocktailService();

    /**
     * Defines Cocktail Storage.
     */
    const [cocktail, setCocktail] = useState({} as ICocktail);

    /**
     * Lifecycle Mounted. Apply Dummy Security And Load Cocktails.
     */
    useEffect(() => {

        if (identityState.jwt?.tokenValue == null) navigate("/")

        // Check No ID Case And Send To Not Found Page.
        if (id === undefined) navigate("/*")

        const loadData = async () => {

            let response = await cocktailService.get(id!, identityState.jwt);

            // Check That Data Was Sent
            if (response.data) setCocktail(response.data);

            // Check That JWT Wos Refreshed
            if (response.newJwt) identityState.setJwt(response.newJwt);

            console.log("ASAD")

        }

        loadData();
    }, []);

    return (

        <>
            <NavBar />

            <div className={`${styles.detailContainer} d-flex justify-content-center`}>

                <div className={`col-lg-8 border p-3 ${styles.mainSection}`}>

                    <div>
                        <div className={`row ${styles.detailSection} m-0`}>

                            <div className={`col-lg-4 ${styles.leftSideProductBox}`}>
                                <img src={cocktail.coverImagePath} className={`border ${styles.myImg} p-3`} />
                            </div>

                            <div className="col-lg-8">
                                <div className={`${styles.rightSideProDetail} border p-3 m-0`}>
                                    <div className="row">

                                        <div className="col-lg-12">
                                            <p className={`m-0 p-0 ${styles.cocktailName} ${styles.myP} text-center`}>{cocktail.name === undefined ? "" : cocktail.name["en-GB"]}</p>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 mt-3 mb-3 text-center">

                                                <p className={`m-0 p-0 ${styles.alcoholField} ${styles.myP} ${cocktail.isAlcoholic ? styles.alcoholFieldCare : styles.alcoholFieldFine}`}>{cocktail.isAlcoholic ? 'Not For Kids! Cocktail Contains Alcohol.' : 'Event Kids Can Drink It!'}</p>

                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className={`col-lg-6 pt-2 ${styles.ingredients}`}>
                                                <h5 className="text-center">Ingredients You Need</h5>

                                                <div className="mt-3 mb-3">

                                                    {cocktail.ingredientInCocktails?.map(ingredient => {

                                                        return (

                                                            <span className={`fs-5 ${styles.mySpan} `} key={ingredient.id}>
                                                                {cocktail.ingredientInCocktails?.indexOf(ingredient) !== undefined ? cocktail.ingredientInCocktails?.indexOf(ingredient) + 1 : ""}) {ingredient.ingredientName !== undefined ? ingredient.ingredientName["en-GB"] : ""} - {ingredient.amount} {ingredient.amountUnitName !== undefined ? ingredient.amountUnitName["en-GB"] : ""}
                                                            </span>

                                                        );
                                                    })}

                                                </div>

                                            </div>
                                            <div className={`col-lg-6 pt-2 ${styles.ingredients}`}>
                                                <h5 className="text-center">Drinks You Need</h5>

                                                <div className={`mt-3 mb-3 ${styles.texty}`}>
                                                    {cocktail.drinksInCocktails?.map(drink => {

                                                        return (

                                                            <span className={`fs-5 ${styles.mySpan} `} key={drink.id}>
                                                                {cocktail.drinksInCocktails?.indexOf(drink) !== undefined ? cocktail.drinksInCocktails?.indexOf(drink) + 1 : ""}) {drink.drinkName !== undefined ? drink.drinkName["en-GB"] : ""} - {drink.amount} {drink.amountUnitName !== undefined ? drink.amountUnitName["en-GB"] : ""}
                                                            </span>

                                                        );
                                                    })}

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-lg-12 pt-2">
                                <h5 className={`mt-5 text-center fs-4 mb-5 ${styles.myH5}`}>Steps You Need To Do For Cocktail Preparation</h5>

                                <div className={`${styles.stepField}`}>
                                    {cocktail.steps?.sort((a, b) => a.indexNumber - b.indexNumber).map(step => {

                                        return (

                                            <span className={`fs-5 ${styles.mySpan} `} key={step.id}> {step.indexNumber}) - {step.description["en-GB"]} </span>

                                        );

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


export default CocktailDetails;