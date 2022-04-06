import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {FaRegStar} from "react-icons/fa";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../services/firebase-config";

import EvaluationConceptAddComponent from "../components/evaluation_concept_add_component";
import EvaluationTestedAddComponent from "../components/evaluation_tested_add_component";

import {calculateMean} from "../services/mathUtils";

import '../styles/Evaluation.css';

function EvaluationPage(props) {

    const [creatorName, setCreatorName] = useState([]);

    // Fetches Firestore data to display it
    useEffect(() => {
    }, []);

    return (
        <div>

            <div>
                <p className="publicDetailsHeadline">
                    Evaluation
                </p>
            </div>

            <div className="evaluationMainDiv">
                <div className="detailFlexParent">
                    <div className="detailFlexCategoryLeft">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Bewertung des Konzepts:</p>
                        </div>
                    </div>

                    <div className="detailFlexCategoryRight">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Bewertung nach Erprobung:</p>
                        </div>
                    </div>

                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexValueLeft">
                        <div className="detailStarDiv">
                            <FaRegStar color={props.material ? props.material.evaluationConcept? calculateMean(props.material.evaluationConcept) > 0 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationConcept? calculateMean(props.material.evaluationConcept) > 1 ? "green" : "black" : "Wird geladen": "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationConcept? calculateMean(props.material.evaluationConcept) > 2 ? "green" : "black" : "Wird geladen": "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationConcept? calculateMean(props.material.evaluationConcept) > 3 ? "green" : "black" : "Wird geladen": "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationConcept? calculateMean(props.material.evaluationConcept) > 4 ? "green" : "black" : "Wird geladen": "Wird geladen"} size={28}/>
                        </div>
                    </div>

                    <div className="detailFlexValueRight">
                        <div className="detailStarDiv">
                            <FaRegStar color={props.material ? props.material.evaluationTested? calculateMean(props.material.evaluationTested) > 0 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationTested? calculateMean(props.material.evaluationTested) > 1 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationTested? calculateMean(props.material.evaluationTested) > 2 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationTested? calculateMean(props.material.evaluationTested) > 3 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                            <FaRegStar color={props.material ? props.material.evaluationTested? calculateMean(props.material.evaluationTested) > 4 ? "green" : "black" : "Wird geladen" : "Wird geladen"} size={28}/>
                        </div>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexCategoryLeft">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Gefunden von:</p>
                        </div>
                    </div>
                    <div className="detailFlexCategoryRight">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Begutachtet von:</p>
                        </div>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexValueLeft">
                        <p className="detailValueDiv">{creatorName ? creatorName !== "" ? creatorName : "Keine Angabe" : "Wird geladen"}</p>
                    </div>
                    <div className="detailFlexValueRight">
                        <p className="detailValueDiv">{props.material ? props.material.examinedBy !== "" ? props.material.examinedBy : "Keine Angabe" : "Wird geladen"}</p>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexCategoryLeft">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Nachweis der Begutachtung:</p>
                        </div>
                    </div>
                    <div className="detailFlexCategoryRight">
                        <div className="detailCategoryDiv">
                            <p className="textHeader">Nachweis der Lizenz:</p>
                        </div>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexValueLeft">
                        <p className="detailValueDiv">{props.material ? props.material.proofEvaluation !== "" ? props.material.proofEvaluation : "Keine Angabe" : "Wird geladen"}</p>
                    </div>
                    <div className="detailFlexValueRight">
                        <p className="detailValueDiv">{props.material ? props.material.proofLicence !== "" ? props.material.proofLicence : "Keine Angabe" : "Wird geladen"}</p>
                    </div>
                </div>

                <div>
                    <p className="evaluationAddHeader">
                        Eigene Evaluation
                    </p>
                </div>

                <div className="evaOwnEvaDiv">
                    <div className="evaLeftColumn">
                        <div>
                            <p className="evaluationAddHeader">
                                Eigene Evaluation des Konzepts hinzufügen
                            </p>
                        </div>
                        {props.material ? props.material.evaluationConceptIds ?
                            props.material.evaluationConceptIds.includes(sessionStorage.getItem('login_id'))
                                ? <div> Sie haben bereits eine Evaluation eingereicht.</div>
                                : <EvaluationConceptAddComponent material={props.material} />
                            : <div>Wird geladen</div>
                            : <div>Wird geladen</div>
                        }
                    </div>
                    <div className="evaRightColumn">
                        <div>
                            <p className="evaluationAddHeader">
                                Eigene Evaluation nach Erprobung hinzufügen
                            </p>
                        </div>
                        {props.material ? props.material.evaluationTestedIds ?
                            props.material.evaluationTestedIds.includes(sessionStorage.getItem('login_id'))
                                ? <div> Sie haben bereits eine Evaluation eingereicht.</div>
                                : <EvaluationTestedAddComponent material={props.material}/>
                            : <div>Wird geladen</div>
                            : <div>Wird geladen</div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EvaluationPage;
