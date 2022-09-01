import React, { useContext, useEffect, useState } from 'react';

import { IIngredient } from '../../../domain/IIngredient';
import { IdentityAppContext } from '../../../context/AppContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IngredientService } from '../../../services/IngredientService';

import AdminNavBar from '../AdminNavBar';

import styles from './IngredientAdd.module.css';


/**
 * Ingredient Add/Edit Page View Component.
 * @returns {JSX.Element} View Of The Ingredient Add/Edit Page.
 */
const IngredientAdd = (): JSX.Element => {

  /**
   * Defines Rounting Connection.
   */
  let navigate = useNavigate();

  /**
   * Defines Connection To Passed Drink Type ID.
   */
  let { id } = useParams();

  /**
   * Defines Error Occurance.
   */
  const [errorFlag, setErrorFlag] = useState(false);

  /**
   * Defines Ingredient Data.
   */
  const [ingredientData, setIngredientData] = useState({} as IIngredient);

  /**
   * Defines Identity State Connection
   */
  let identityState = useContext(IdentityAppContext);

  /**
   * Defines Ingredient Service Connection.
   */
  let ingredientService = new IngredientService();

  /**
   * Defines Ingredient Storage.
   */
  const [ingredient, setIngredient] = useState({} as IIngredient);

  /**
   * Lifecycle Mounted. Apply Dummy Security And Load Drink Type.
   */
  useEffect(() => {

    if (identityState.jwt?.tokenValue == null) navigate("/")

    if (identityState.jwt?.role !== "Admin") navigate("/home")

    // Check ID Case -> User Want To Modify.
    if (id !== undefined) {

      const loadData = async () => {

        let response = await ingredientService.get(id!, identityState.jwt);

        // Check That Data Was Sent
        if (response.data) setIngredient(response.data);

        // Check That JWT Wos Refreshed
        if (response.newJwt) identityState.setJwt(response.newJwt);

        setIngredientData({ id: response.data?.id, name: response.data?.name!, description: response.data?.description, coverImagePath: response.data?.coverImagePath })

      }

      loadData();

    }

  }, []);

  /**
   * Method Handles Errors Occured During Call In Backend. 
   * @returns Error Section Div.
   */
  function ErrorTyped() {

    if (errorFlag)
      return <div className="alert alert-danger text-center mb-5">Something Went Wrong. Please Try Again!</div>
    else
      return <div></div>
  }

  /**
   * Method Adds Create Or Modify Button Based On ID.
   * @returns Button Element.
   */
  function ButtonChose() {

    if (id !== undefined) return <button onClick={(e) => addClicked(e.nativeEvent)} className={`${styles.leftBtn} btn btn-outline-light btn-lg px-5 mt-5`}>Edit</button>
    else return <button onClick={(e) => addClicked(e.nativeEvent)} className={`${styles.leftBtn} btn btn-outline-light btn-lg px-5 mt-5`}>Add</button>
  }

  /**
   * Method Adds/Edits Ingredient Into System After Clicking Button.
   * @param {Event} e Defines Event That Dragged Here.
   */
  const addClicked = async (e: Event) => {

    e.preventDefault();

    let response;

    // Add Action
    if (id === undefined) response = await ingredientService.add(ingredientData, identityState.jwt);

    // Edit Action
    else response = await ingredientService.update(id, ingredientData, identityState.jwt);

    // Check That JWT Wos Refreshed
    if (response.newJwt) identityState.setJwt(response.newJwt);

    // Check If Operation Succeded.
    if (response.statusCode >= 200 && response.statusCode < 300) {

      navigate('/ingredients');

    } else {

      setErrorFlag(true);

    }
  }

  /**
   * Function Pushes User Back.
   */
  const back = () => {

    navigate('/ingredients');

  }



  return (

    <div className="d-flex">

      <AdminNavBar />

      <section className={`${styles.gallery}`}>

        <section className="vh-100 wrapper">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className={`card bg-dark text-white ${styles.dataBox}`}>
                  <div className={`${styles.cardBody} p-5 text-center`}>
                    <div className="mb-md-5 mt-md-4 pb-5">

                      <h2 className="fw-bold mb-2 text-uppercase">{id === undefined ? "Create" : "Modify"} Ingredient</h2>

                      <p className="text-white mt-5 mb-5">Please Enter Ingredient Information Below!</p>

                      <ErrorTyped />

                      <div className="form-outline form-white mb-4">
                        <input value={ingredientData.name === undefined ? "" : ingredientData.name["en-GB"]} onChange={e => setIngredientData({ ...ingredientData, name: { "en-GB": e.target.value, "ee-ET": "", "ru-RU": "" } })} type="text" className="form-control form-control-lg" placeholder="Name" />
                      </div>

                      <textarea value={ingredientData.description === undefined ? "" : ingredientData.description!["en-GB"]} onChange={e => setIngredientData({ ...ingredientData, description: { "en-GB": e.target.value, "ee-ET": "", "ru-RU": "" } })} className={`form-control ${styles.myForm}`} id="textAreaExample" rows={4} placeholder="Describe Your Ingredient">
                      </textarea>

                      <div className="form-outline form-white mt-5 mb-4">
                        <input value={ingredientData.coverImagePath === undefined ? "" : ingredientData.coverImagePath} onChange={e => setIngredientData({ ...ingredientData, coverImagePath: e.target.value })} type="text" className="form-control" placeholder="Your Ingredient Image URL" />
                      </div>

                      <ButtonChose />
                      <button onClick={() => back()} className={`${styles.rightBtn} btn btn-outline-light btn-lg px-5 mt-5`}>Back</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>

  );
}


export default IngredientAdd;