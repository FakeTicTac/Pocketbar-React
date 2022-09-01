import React, { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IDrinkType } from '../../../domain/IDrinkType';
import { IdentityAppContext } from '../../../context/AppContext';
import { DrinkTypeService } from '../../../services/DrinkTypeService';

import AdminNavBar from '../AdminNavBar';

import styles from "./DrinkType.module.css";


/**
 * Drink Type Page View Component.
 * @returns {JSX.Element} View Of The Home Page.
 */
const DrinkType = (): JSX.Element => {

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
   * Defines Drink Type Service Connection.
   */
  let drinkTypeService = new DrinkTypeService();

  /**
   * Defines Drink Type Storage.
   */
  const [drinkTypes, setDrinkTypes] = useState([] as IDrinkType[]);

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
      return <a href="" onClick={(e) => deleteDrinkType(e, props.id)} className={`btn ${styles.btnDelete} fs-5 btn-sm`}>Delete</a>
    else
      return null;
  }

  /**
   * Method Deletes Drink Type From Backend.
   * @param {React.MouseEvent} e Defines Invoked Function Event. 
   */
  async function deleteDrinkType(e: React.MouseEvent, id: any) {

    e.preventDefault();

    let response = await drinkTypeService.remove(id, identityState.jwt);

    if (response.statusCode !== 204) setDeleteFlag(true);

    loadData();
  }

  /**
   * Method Loads Ingredient Data.
   */
  const loadData = async () => {

    let response = await drinkTypeService.getAll(identityState.jwt);

    // Check That Data Was Sent
    if (response.data) {

      setDrinkTypes(response.data);
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

    <div className="d-flex">

      <AdminNavBar />

      <section className={`${styles.gallery} container-fluid`}>
        <div className={`${styles.headerSection}`}>

          <div className={`row ${styles.addCardRow} d-flex justify-content-center`}>
            <div className={`col-lg-12 ${styles.addCardContainer} mb-4`}>

              <Link to="/drinktype/create" className={`${styles.card} card ${styles.cardAddButton} h-100`}>
                <div className={`card-body align-self-center ${styles.my} d-flex justify-content-center`}>

                  <img className={`${styles.imageHeader} align-self-center`} />

                  Create Drink Type

                </div>
              </Link>

            </div>
          </div>
        </div>

        <ErrorIndicator />

        <div className={`row ${styles.cardRow}`}>

          {drinkTypes.map(drinkType => {

            return (

              <div className="card-data col-lg-3 mb-4" key={drinkType.id}>
                <div className={`${styles.card} card h-100`}>
                  <div className="card-body">

                    <h5 className="card-title fs-4 text-center">{drinkType.name === undefined ? "" : drinkType.name["en-GB"]} - {drinkType.drinksCount} Usages</h5>
                    <hr className={`${styles.hrTop}`} />
                    <p className={`${styles.cardText}`}>{drinkType.description !== undefined ? drinkType.description["en-GB"] : "Drink Type Doesn't Have Description."}</p>

                    <div className={`${styles.cardBtnContainer} text-center`}>

                      <Link to={`/drinkType/edit/id=${drinkType.id}`} className={`btn ${styles.btnModify} fs-5 btn-sm`}>Modify</Link>
                      <ButtonBlock id={drinkType.id} counter={drinkType.drinksCount} />
                    </div>

                  </div>
                </div>
              </div>

            );

          })}


        </div>

      </section>
    </div>

  );
}


export default DrinkType;