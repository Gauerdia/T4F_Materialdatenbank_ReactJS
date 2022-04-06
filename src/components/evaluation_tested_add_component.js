import React, {useEffect, useState} from "react";
import '../styles/Components.css';
import {Rating} from "react-simple-star-rating";
import {addTestedEvaluation} from "../services/firebase-crud"
import {useNavigate} from "react-router-dom";

function EvaluationTestedAddComponent(props) {

    // starRating is the temp value of the stars on the page
    const [starRating, setStarRating] = useState(0);
    // testedIds is the array of the people who already voted
    const [testedIds, setTestedIds] = useState([]);
    // ratings is the final array we want to use to write to the database
    const [ratings, setRatings] = useState([]);

    let navigate = useNavigate();

    // When clicked on the stars, this value is being changed
    function changeStarRating(newRating){
        setStarRating(newRating)
    }

    // On the final push on the submit button
    function submitButtonPressed(){
        let realStarRating = starRating/20;
        setRatings(ratings => ([...ratings,realStarRating]));
    }


    // When the app is started
    useEffect(() => {

        // Check if the property was forwarded correctly
        if(props.material){

            // testedIds will be the array of the Ids before + the new Id after adding an evaluation
            // We fetch the former content and append the current user's id
            setTestedIds(props.material.evaluationTestedIds);

            // If it's the first element
            if(testedIds.length === 0){
                setTestedIds(sessionStorage.getItem('login_id'));
            // If we just append to the array
            }else{
                setTestedIds( tested =>
                    [...tested,sessionStorage.getItem('login_id')]);
            }

            // We do also set the evaluation values to append them with the input of the user
            setRatings(props.material.evaluationTested);
        }
    }, []);

    // Triggered, when ratings is being changed
    useEffect(()=>{

        console.log("EvaTested:", props.material)

        // If the original data exists and also our ratings
        if(props.material.evaluationTested){

            // If their lengths differ, that means there is a new rating
            if(ratings.length !== props.material.evaluationTested.length){
                addTestedEvaluation(ratings, props.material, testedIds)
                    .then((result) => {
                        alert("Erprobungs-Evaluation wurde erfolgreich abgegeben.")
                        navigate('/home')
                        // window.location.reload(false);
                    });
            }
        }
    },[ratings]);


    return (
        <div>
            <div>
                <div>
                    Bewertung des Konzepts
                </div>
                <div>
                    <Rating
                        onClick={changeStarRating}
                        ratingValue={starRating}
                    />
                </div>
                <div>
                    <button
                        className="submitButton"
                        onClick={submitButtonPressed}
                    >
                        Abschicken
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EvaluationTestedAddComponent;
