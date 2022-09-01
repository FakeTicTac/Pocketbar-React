import React, { useContext, useEffect, useState } from 'react';

import { IDrinkType } from '../../../domain/IDrinkType';
import { IdentityAppContext } from '../../../context/AppContext';
import { DrinkTypeService } from '../../../services/DrinkTypeService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AdminNavBar from '../AdminNavBar';

import styles from "./DrinkTypeAdd.module.css";


/**
 * Drink Type Add/Edit Page View Component.
 * @returns {JSX.Element} View Of The Drink Type Add/Edit Page.
 */
const DrinkTypeAdd = (): JSX.Element => {

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
   * Defines Login Data.
   */
  const [drinkTypeData, setDrinkTypeData] = useState({} as IDrinkType);

  /**
   * Defines Identity State Connection
   */
  let identityState = useContext(IdentityAppContext);

  /**
   * Defines Drink Type Service Connection.
   */
  let drinkTypeService = new DrinkTypeService();

  /**
   * Defines Drink Type Storage.
   */
  const [drinkType, setDrinkType] = useState({} as IDrinkType);

  /**
   * Lifecycle Mounted. Apply Dummy Security And Load Drink Type.
   */
  useEffect(() => {

    if (identityState.jwt?.tokenValue == null) navigate("/")

    if (identityState.jwt?.role !== "Admin") navigate("/home")

    // Check ID Case -> User Want To Modify.
    if (id !== undefined) {

      const loadData = async () => {

        let response = await drinkTypeService.get(id!, identityState.jwt);

        // Check That Data Was Sent
        if (response.data) setDrinkType(response.data);

        // Check That JWT Wos Refreshed
        if (response.newJwt) identityState.setJwt(response.newJwt);

        setDrinkTypeData({ id: response.data?.id, name: response.data?.name!, description: response.data?.description })

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
   * Method Adds/Edits Drink Type Into System After Clicking Button.
   * @param {Event} e Defines Event That Dragged Here.
   */
  const addClicked = async (e: Event) => {

    e.preventDefault();

    let response;

    // Add Action
    if (id === undefined) response = await drinkTypeService.add(drinkTypeData, identityState.jwt);

    // Edit Action
    else response = await drinkTypeService.update(id, drinkTypeData, identityState.jwt);

    // Check That JWT Wos Refreshed
    if (response.newJwt) identityState.setJwt(response.newJwt);

    // Check If Operation Succeded.
    if (response.statusCode >= 200 && response.statusCode < 300) {

      navigate('/drink-types');

    } else {

      setErrorFlag(true);

    }
  }

  /**
   * Function Pushes User Back.
   */
  const back = () => {

    navigate('/drink-types');

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

                      <h2 className="fw-bold mb-2 text-uppercase">{id === undefined ? "Create" : "Modify"} Drink Type</h2>

                      <p className="text-white mt-5 mb-5">Please Enter Drink Type Information Below!</p>

                      <ErrorTyped />

                      <div className="form-outline form-white mb-4">
                        <input value={drinkTypeData.name === undefined ? "" : drinkTypeData.name["en-GB"]} onChange={e => setDrinkTypeData({ ...drinkTypeData, name: { "en-GB": e.target.value, "ee-ET": "", "ru-RU": "" } })} type="text" className="form-control form-control-lg" placeholder="Name" />
                      </div>

                      <textarea value={drinkTypeData.description === undefined ? "" : drinkTypeData.description!["en-GB"]} onChange={e => setDrinkTypeData({ ...drinkTypeData, description: { "en-GB": e.target.value, "ee-ET": "", "ru-RU": "" } })} className={`form-control ${styles.myForm}`} id="textAreaExample" rows={4} placeholder="Describe Your Type Of Drink">
                      </textarea>

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


export default DrinkTypeAdd;