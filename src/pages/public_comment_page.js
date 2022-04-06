import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from "react-router-dom";
import {getComments} from "../services/firebase-crud";
import {BsFillPersonFill} from "react-icons/bs";

import '../styles/DetailsPage.css';

function PublicCommentPage(){

    const [material, setMaterial] = useState([]);
    const [comments, setComments] = useState([]);

    let location = useLocation()

    // Fetches Firestore data to display it
    useEffect(() => {
        fetchMaterial().then((result) =>{
            fetchComments(result.id)
        })
    }, []);

    const fetchMaterial = async() =>{
        if(location.state.material){
            setMaterial(location.state.material);
        }
        return location.state.material
    }

    const fetchComments = async(id) =>{
        const data = await getComments(id);
        setComments(
            data.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
    }

    return(
        <div>
            <div className="MainDiv">
                <p className="publicDetailsHeadline">Die Kommentarspalte zum Material {material ? material.name : "Wird geladen"}</p>
                <div className="leftColumn">
                    <p>  </p>
                </div>
                <div className="mainColumn">
                    {comments.map((comment) => (
                        <div className="commentDiv">
                            <div className="commentContent">
                                {comment.content}
                            </div>
                            <div className="homeFlexParent">
                                <div className="commentLeftColumn">
                                    <BsFillPersonFill/>
                                </div>
                                <div className="commentMiddleColumn">
                                    {comment.creatorName}
                                </div>
                                <div className="commentRightColumn">
                                    {comment.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="rightColumn">
                </div>
            </div>
        </div>
    );
}
export default PublicCommentPage;