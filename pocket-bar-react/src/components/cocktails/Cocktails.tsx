import React, { useContext, useEffect, useState } from 'react';

import { ICocktail } from '../../domain/ICocktail';
import { IdentityAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { CocktailService } from '../../services/CocktailService';

import NavBar from '../NavBar';

import styles from "./Cocktails.module.css";


/**
 * Cocktail Page View Component.
 * @returns {JSX.Element} View Of The Cocktail Page.
 */
const Cocktails = (): JSX.Element => {

  /**
  * Defines Rounting Connection.
  */
  let navigate = useNavigate();

  /**
  * Defines Identity State Connection
  */
  let identityState = useContext(IdentityAppContext);

  /**
   * Defines Error Loading Occurance.
  */
  const [errorFlag, setErrorFlag] = useState(false);

  /**
   * Defines Error Delete Occurance.
  */
  const [deleteFlag, setDeleteFlag] = useState(false);

  /**
   * Defines Cocktails Service Connection.
  */
  let cocktailService = new CocktailService();

  /**
   * Defines Cocktail Storage.
  */
  const [cocktails, setCocktails] = useState([] as ICocktail[]);

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
   * Method Handles Admin And Bartender Buttons Appearence.
   * @returns Button To Delete Cocktail.
   */
  function AdminButton(props: any) {

    if (identityState.jwt?.role === "Admin" || identityState.jwt?.role == "Bartender") return <a href="" onClick={(e) => deleteCocktail(e, props.id)} className={`btn ${styles.btnDelete} fs-5 btn-sm`}>Delete</a>
    else return null;

  }

  /**
   * Method Deletes Cocktail From Backend.
   * @param {React.MouseEvent} e Defines Invoked Function Event. 
   */
  async function deleteCocktail(e: React.MouseEvent, id: any) {

    e.preventDefault();

    let response = await cocktailService.remove(id, identityState.jwt);

    if (response.statusCode !== 204) setDeleteFlag(true);

    loadData();
  }

  /**
   * Method Loads Cocktail Data.
   */
  const loadData = async () => {

    let response = await cocktailService.getAll(identityState.jwt);

    // Check That Data Was Sent
    if (response.data) {

      setCocktails(response.data);
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

    loadData();
  }, []);


  return (
    <>
      <NavBar />

      <div className="d-flex">

        <section className={`${styles.gallery} container-fluid`}>

          <ErrorIndicator />

          <div className={`row ${styles.cardRow}`}>

            {cocktails.map(cocktail => {

              return (

                <div className={`card-data col-lg-2 mb-4`} key={cocktail.id}>

                  <div className={`${styles.card} card h-100`}>
                    <div className={`card-body`}>
                      <img className={`${styles.cardImgTop}`} src={cocktail.coverImagePath} alt="Card image cap" />

                      <h5 className={`card-title fs-4 text-center`}>{cocktail.name["en-GB"]}</h5>
                      <hr className={`${styles.hrTop}`} />
                      <p className={`${styles.cardText}`}>{cocktail.description !== undefined ? cocktail.description["en-GB"] : "Drink Type Doesn't Have Description."}</p>

                      <div className={`${styles.cardBtnContainer} text-center`}>
                        <Link to={`/cocktail/details/${cocktail.id}`} className={`btn ${styles.btnDetails} fs-5 btn-sm`}>Details</Link>
                        <AdminButton id={cocktail.id} />
                      </div>
                    </div>
                  </div>

                </div>

              );

            })}

          </div>

        </section>
      </div>
    </>
  );
}


export default Cocktails;