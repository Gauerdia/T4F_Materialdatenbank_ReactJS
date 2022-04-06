import React, {useEffect, useState, useRef} from 'react';
// import {useLocation, useParams} from 'react-router-dom';
// import emailjs from '@emailjs/browser';
// import emailkey from "../emailkey";

import '../styles/DetailsPage.css';

function GeneralInformationPage(props){

    const [material, setMaterial] = useState([]);

    // Fetches Firestore data to display it
    useEffect(() => {

        setMaterial(props.material)

    }, []);

    return (
        <div>
            <div className="MainDiv">
                <p className="publicDetailsHeadline">
                    Details zu dem Material {material ? material.name : "Wird geladen"}
                </p>
                <div className="leftColumn">
                    <p>  </p>
                </div>
                <div className="mainColumn">
                    <div className="DetailsDiv">

                        {/*MAIN INFORMATION SHEET*/}

                        <div>
                            <p>
                                Allgemeine Informationen
                            </p>
                        </div>

                        <div>
                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Name:</p>
                                    </div>
                                </div>
                                <div className="detailFlexCategoryRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">AutorIn:</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">{material ? material.name !== "" ? material.name : "Keine Angabe" : "Wird geladen"}</p>
                                </div>
                                <div className="detailFlexValueRight">
                                    <p className="detailValueDiv">{material ? material.author !== "" ? material.author : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Lizenz:</p>
                                    </div>
                                </div>
                                <div className="detailFlexCategoryRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Titel:</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">{material ? material.licence !== "" ? material.licence : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                                <div className="detailFlexValueRight">
                                    <p className="detailValueDiv">{material ? material.title !== "" ? material.title : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Themengebiet:</p>
                                    </div>
                                </div>
                                <div className="detailFlexCategoryRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Schlagworte:</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">{material ? material.topic !== "" ? material.topic : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                                <div className="detailFlexValueRight">
                                    <p className="detailValueDiv">{material ? material.keywords !== "" ? material.keywords : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Evaluation:</p>
                                    </div>
                                </div>
                                <div className="detailFlexCategoryRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">URL:</p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">{material ? material.evaluation !== "" ? material.evaluation : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                                <div className="detailFlexValueRight">
                                    <p className="detailValueDiv">
                                        <a  href={material ? material.url !== "" ? material.url : "": "Wird geladen"}>Link</a>
                                    </p>

                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Dateianhang:</p>
                                    </div>
                                </div>
                                <div className="detailFlexRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader"> </p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">
                                        <a  href={material ? material.downloadUrl !== "" ? material.downloadUrl : "": "Wird geladen"}>Link</a>
                                    </p>

                                </div>
                                <div className="detailFlexRight">
                                    <p className="detailValueDiv"> </p>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexCategoryLeft">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader">Beschreibung:</p>
                                    </div>
                                </div>
                                <div className="detailFlexRight">
                                    <div className="detailCategoryDiv">
                                        <p className="textHeader"> </p>
                                    </div>
                                </div>
                            </div>

                            <div className="detailFlexParent">
                                <div className="detailFlexValueLeft">
                                    <p className="detailValueDiv">{material ? material.description !== "" ? material.description : "Keine Angabe": "Wird geladen"}</p>
                                </div>
                                <div className="detailFlexRight">
                                    <p className="detailValueDiv"> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightColumn">
                    <p> </p>
                </div>
            </div>
        </div>
    )
}


export default GeneralInformationPage;
