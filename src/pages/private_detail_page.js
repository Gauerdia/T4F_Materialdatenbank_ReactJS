import React, {useEffect, useState} from 'react';
import {useLocation, } from 'react-router-dom';
import GeneralInformationPage from "./general_information_page";
import ContactCreatorPage from "../components/contact_creator_page";
import EvaluationPage from "./evaluation_page";
import PrivateCommentPage from "./private_comment_page";
import {getSpecificMaterial} from "../services/firebase-crud";
import {useParams} from "react-router";

import '../styles/DetailsPage.css';

function PrivateDetailPage(){

    const [material, setMaterial] = useState([]);
    const [userName, setUserName] = useState([]);

    let location = useLocation()

    const [activeGeneralInfo, setActiveGeneralInfo] = useState(true);
    const [activeEvaluation, setActiveEvaluation] = useState(false);
    const [activeContact, setActiveContact] = useState(false);
    const [activeComments, setActiveComments] = useState(false);

    const { id } = useParams()

    // Fetches Firestore data to display it
    useEffect(() => {

        // Check if we got the material via the Link-component
        if(location.state){
            if(location.state.material){
                setMaterial(location.state.material);
            }
            if(location.state.userName){
                setUserName(location.state.userName);
            }
        // If not, we fetch it from the server
        }else{
            fetchMaterialAndSetItLocally(id)
                // .then((result) => {})
        }

    }, []);

    // useEffect(() =>{}, [material]);

    const fetchMaterialAndSetItLocally = async() =>{
        const data = await getSpecificMaterial(id)
        setMaterial(data);
    }



    const handleClickGeneralInfo = () => {
        setActiveGeneralInfo(true)
        setActiveEvaluation(false)
        setActiveComments(false)
        setActiveContact(false)
    }

    const handleClickEvaluation = () => {
        setActiveGeneralInfo(false)
        setActiveEvaluation(true)
        setActiveComments(false)
        setActiveContact(false)
    }

    const handleClickContact = () => {
        setActiveGeneralInfo(false)
        setActiveEvaluation(false)
        setActiveComments(false)
        setActiveContact(true)
    }

    const handleClickComments = () => {
        setActiveGeneralInfo(false)
        setActiveEvaluation(false)
        setActiveComments(true)
        setActiveContact(false)
    }

    return (

        <div>
            <div className="homeFlexParent">
                <div className="homeLeftColumn">
                    {activeGeneralInfo?
                        (
                            <div className="homeHeadTextActive">
                                <p>Allgemeine Informationen</p>
                            </div>
                        )
                        :(
                            <div className="homeHeadTextPassive"
                                 onClick={handleClickGeneralInfo}>
                                <p>Allgemeine Informationen</p>
                            </div>
                        )
                    }
                </div>
                <div className="homeMainColumn">
                    {activeEvaluation?
                        (
                            <div className="homeHeadTextActive">
                                <p>Evaluation</p>
                            </div>
                        )
                        :(
                            <div className="homeHeadTextPassive"
                                 onClick={handleClickEvaluation}>
                                <p>Evaluation</p>
                            </div>
                        )
                    }
                </div>
                <div className="homeMainColumn">
                    {activeContact?
                        (
                            <div className="homeHeadTextActive">
                                <p>Kontakt zum Ersteller</p>
                            </div>
                        )
                        :(
                            <div className="homeHeadTextPassive"
                                 onClick={handleClickContact}>
                                <p>Kontakt zum Verfasser</p>
                            </div>
                        )
                    }
                </div>
                <div className="homeRightColumn">
                    {activeComments?
                        (
                            <div className="homeHeadTextActive">
                                <p>Kommentare</p>
                            </div>
                        )
                        :(
                            <div className="homeHeadTextPassive"
                                 onClick={handleClickComments}>
                                <p>Kommentare</p>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="homeContentDiv">
                {material ? Object.keys(material).length !== 0 ?
                    activeGeneralInfo?
                    (
                        <div>
                            <GeneralInformationPage material={material} />
                        </div>
                    )
                    :activeEvaluation?
                        (
                            <div>
                                <EvaluationPage material={material} />
                            </div>
                        )
                    :activeContact?
                        (
                            <div>
                                <ContactCreatorPage material={material}/>
                            </div>
                        )
                        :activeComments?
                            (
                                <div>
                                    <PrivateCommentPage material={material} userName={userName}/>
                                </div>
                            )
                            :(
                                <div> Nichts ausgewählt</div>
                            )
                        :(
                            <div>
                                <p>
                                    Wird geladen...
                                </p>
                            </div>
                    ):(
                        <div>
                            <p>
                                Wird geladen...
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    )
}
export default PrivateDetailPage;
