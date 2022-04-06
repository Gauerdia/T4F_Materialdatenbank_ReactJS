import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from "react-router-dom";
import {getComments, createComment} from "../services/firebase-crud";
import {BsFillPersonFill} from "react-icons/bs";

import '../styles/Comments.css';

function PrivateCommentPage(){

    const [material, setMaterial] = useState([]);
    const [comments, setComments] = useState([]);

    const [userName, setUserName] = useState([]);

    const [clickCreateNewComment, setClickCreateNewComment] = useState(false);

    const [createNewCommentContent, setcreateNewCommentContent] = useState([]);

    let location = useLocation()

    function handleClickWantToCreateNewComment(){
        setClickCreateNewComment(true);
    }


    function handleClickCreateNewComment(){
        createComment(createNewCommentContent, sessionStorage.getItem('login_id'),
            userName.userName, material.id)
            .then((result) => {
                fetchComments(material.id)
                setClickCreateNewComment(false)
            })
    }


    // Fetches Firestore data to display it
    useEffect(() => {
        fetchMaterial().then((result) => {
            fetchComments(result.id)
        });
        fetchUserName();
    }, []);

    const handleTextAreaInput = (event) => {
        setcreateNewCommentContent(event.target.value);
    }

    const fetchUserName = async() => {
        if(location.state.userName){
            setUserName(location.state.userName);
        }
    }

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
        return comments;
    }

    return(
        <div>
            <div className="MainDiv">
                <p className="publicDetailsHeadline">Die Kommentarspalte zum Material {material ? material.name : "Wird geladen"}</p>
                <div className="leftColumn">
                    <p>  </p>
                </div>
                <div className="mainColumn">
                    {comments.sort((a,b) => a.dateToSort > b.dateToSort ? -1: 1)
                        .map((comment) => (
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
                    {clickCreateNewComment?
                        (
                            <div>
                                <div className="commentTextAreaDiv">
                                    <div className="commentCreateCommentHeader">
                                        Kommentar schreiben
                                    </div>
                                    <textarea
                                        placeholder="Remember, be nice!"
                                        cols="30"
                                        rows="5"
                                        name="message"
                                        className="commentTextArea"
                                        onChange={handleTextAreaInput}
                                    />
                                </div>
                                <div >
                                    <button
                                        className="commentNewCommentButton"
                                        onClick={handleClickCreateNewComment}>
                                        Kommentar abschicken
                                    </button>
                                </div>
                        </div>
                        )
                        :(
                            <div>
                                <button
                                    className="commentNewCommentButton"
                                    onClick={handleClickWantToCreateNewComment}>
                                    Neuen Kommentar erstellen
                                </button>
                            </div>
                        )
                    }
                </div>
                <div className="rightColumn">
                </div>
            </div>
        </div>
    );
}
export default PrivateCommentPage;