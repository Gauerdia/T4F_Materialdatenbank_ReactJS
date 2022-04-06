import React, {useEffect, useState} from "react";
import '../styles/Components.css';
import { Rating } from 'react-simple-star-rating'
import {addConceptEvaluation} from "../services/firebase-crud"
import star from "react-rating-stars-component/dist/star";
import {useNavigate} from "react-router-dom";

function EvaluationConceptAddComponent(props) {

    const [starRating, setStarRating] = useState(0);
    const [conceptIds, setConceptIds] = useState([]);
    const [ratings, setRatings] = useState([]);

    let navigate = useNavigate();

    function changeStarRating(newRating){
        setStarRating(newRating)
    }
    function submitButtonPressed(){
        let realStarRating = starRating/20;
        setRatings(ratings => ([...ratings,realStarRating]));
    }

    useEffect(()=>{
        console.log("EvaCon:", props.material)

        if(props.material.evaluationConcept){
            console.log("useEffect:", props.evaluationConcept, ratings.length)
            if(ratings.length !== props.material.evaluationConcept.length){
                console.log("useEffect")
                addConceptEvaluation(ratings, props.material, conceptIds).then((result) => {
                    console.log("response:", result)
                    alert("Konzept-Evaluation wurde erfolgreich abgegeben.")
                    navigate('/home')
                    // window.location.reload(false);
                });
            }
        }
    },[ratings]);


    // When the app is started
    useEffect(() => {
        // ConceptIds will be the array of the Ids before + the new Id after adding an evaluation
        // We fetch the former content and append the current user's id
        setConceptIds(props.material.evaluationConceptIds);

        if(conceptIds.length === 0){
            setConceptIds(sessionStorage.getItem('login_id'));
        }else{
            setConceptIds( concepts =>
                [...concepts,sessionStorage.getItem('login_id')]);
        }
        // We do also set the evaluation values to append them with the input of the user
        setRatings(props.material.evaluationConcept);
    }, []);


    return (
        <div>
            <div>
                <div>
                    Bewertung des Konzepts
                </div>
                <div>
                    <Rating onClick={changeStarRating} ratingValue={starRating}/>
                </div>
                <div>
                    <button
                        className="submitButton"
                    onClick={submitButtonPressed}
                    >Abschicken</button>
                </div>
            </div>
        </div>
    );
}

export default EvaluationConceptAddComponent;
