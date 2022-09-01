import React, { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IIngredient } from '../../../domain/IIngredient';
import { IdentityAppContext } from '../../../context/AppContext';
import { IngredientService } from '../../../services/IngredientService';

import AdminNavBar from '../AdminNavBar';

import styles from "./Ingredient.module.css";


/**
 * Ingredient Page View Component.
 * @returns {JSX.Element} View Of The Ingredient Page.
 */
const Ingredient = (): JSX.Element => {

  /**
   * Defines Rounting Connection.
   */
  let navigate = useNavigate();

  /**
   * Defines Identity State Connection
   */
  let identityState = useContext(IdentityAppContext);

  /**
   * Defines Error Occurance.
  */
  const [errorFlag, setErrorFlag] = useState(false);

  /**
   * Defines Error Delete Occurance.
  */
  const [deleteFlag, setDeleteFlag] = useState(false);

  /**
   * Defines Ingredient Service Connection.
   */
  let ingredientService = new IngredientService();

  /**
   * Defines Ingredient Storage.
   */
  const [ingredients, setIngredients] = useState([] as IIngredient[]);

  /**
   * Method Handles Errors Occured During Call In Backend. 
   * @returns Error Section Div.
   */
  function ErrorIndicator() {

    if (errorFlag || deleteFlag)
      return <div className="alert alert-danger text-center mb-5">{errorFlag ? "Resource Loading Went Wrong." : "Resource Deletion Went Wrong."} Please Try Again!`</div>
    else
      return <div></div>
  }

  /**
   * Method Handles Deletion Option. 
   * @returns Deletion Section Button.
   */
  function ButtonBlock(props: any) {

    if (props.counter == 0)
      return <a href="" onClick={(e) => deleteIngredient(e, props.id)} className={`btn ${styles.btnDelete} fs-5 btn-sm`}>Delete</a>
    else
      return null;
  }

  /**
   * Method Deletes Ingredient From Backend.
   * @param {React.MouseEvent} e Defines Invoked Function Event. 
   */
  async function deleteIngredient(e: React.MouseEvent, id: any) {

    e.preventDefault();

    let response = await ingredientService.remove(id, identityState.jwt);

    if (response.statusCode !== 204) setDeleteFlag(true);

    loadData();
  }

  /**
   * Method Loads Ingredient Data.
   */
  const loadData = async () => {

    let response = await ingredientService.getAll(identityState.jwt);

    // Check That Data Was Sent
    if (response.data) {

      setIngredients(response.data);
      setErrorFlag(false);

    }
    else {

      setErrorFlag(true);

    }

    // Check That JWT Wos Refreshed
    if (response.newJwt) identityState.setJwt(response.newJwt);

  }

  /**
   * Lifecycle Mounted. Apply Dummy Security And Load Cocktails.
   */
  useEffect(() => {

    if (identityState.jwt?.tokenValue == null) navigate("/")

    if (identityState.jwt?.role !== "Admin") navigate("/home")

    loadData();
  }, []);


  return (
    <>
      <div className="d-flex">

        <AdminNavBar />

        <section className={`${styles.gallery} container-fluid`}>
          <div className={`${styles.headerSection}`}>

            <div className={`row ${styles.addCardRow} d-flex justify-content-center`}>
              <div className={`col-lg-12 ${styles.addCardContainer} mb-4`}>

                <Link to="/ingredient/create" className={`card ${styles.card} ${styles.cardAddButton} h-100`}>
                  <div className={`card-body align-self-center ${styles.my} d-flex justify-content-center`}>

                    <img className={`${styles.imageHeader} image-header align-self-center`} />

                    Create Ingredient

                  </div>
                </Link>
              </div>
            </div>
          </div>

          <ErrorIndicator />

          <div className={`row ${styles.cardRow}`}>

            {ingredients.map(ingredient => {

              return (

                <div className="card-data col-lg-3 mb-4" key={ingredient.id}>

                  <div className={`card ${styles.card} h-100`}>
                    <img className={`${styles.cardImgTop}`} src={ingredient.coverImagePath} alt="Card image cap" />

                    <div className="card-body">

                      <h5 className="card-title fs-4 text-center">{ingredient.name === undefined ? "" : ingredient.name["en-GB"]} - {ingredient.ingredientInCocktailsCount} Usages</h5>
                      <hr className={`${styles.hrTop}`} />
                      <p className={`${styles.cardText}`}>{ingredient.description !== undefined ? ingredient.description["en-GB"] : "Drink Type Doesn't Have Description."}</p>

                      <div className={`${styles.cardBtnContainer} text-center`}>

                        <Link to={`/ingredient/edit/${ingredient.id}`} className={`btn ${styles.btnModify} fs-5 btn-sm`}>Modify</Link>
                        <ButtonBlock id={ingredient.id} counter={ingredient.ingredientInCocktailsCount} />
                      </div>
                    </div>
                  </div>
                </div>

              );

            })};

          </div>
        </section>
      </div>
    </>
  );
}


export default Ingredient;