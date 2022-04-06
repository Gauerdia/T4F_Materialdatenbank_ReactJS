import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import GeneralInformationPage from "./general_information_page";
import ContactCreatorPage from "../components/contact_creator_page";
import PublicCommentPage from "./public_comment_page";

import '../styles/DetailsPage.css';

function PublicDetailPage(){

    const [material, setMaterial] = useState([]);

    let location = useLocation()

    // Fetches Firestore data to display it
    useEffect(() => {
        if(location.state.material){
            setMaterial(location.state.material);
        }
    }, []);


    const [activeGeneralInfo, setActiveGeneralInfo] = useState(true);
    const [activeContact, setActiveContact] = useState(false);
    const [activeComments, setActiveComments] = useState(false);

    const handleClickGeneralInfo = () => {
        setActiveGeneralInfo(true)
        setActiveComments(false)
        setActiveContact(false)
    }

    const handleClickContact = () => {
        setActiveGeneralInfo(false)
        setActiveComments(false)
        setActiveContact(true)
    }

    const handleClickComments = () => {
        setActiveGeneralInfo(false)
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
                            <GeneralInformationPage material={material}/>
                        </div>
                    )
                    :activeContact?
                        (
                            <div>
                                <ContactCreatorPage material={material}/>
                            </div>
                        )
                        : activeComments?
                            (
                                <div>
                                    <PublicCommentPage material={material}/>
                                </div>
                            )
                            :(
                                <div> Nichts ausgewählt</div>
                            ):(
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
    );
}


export default PublicDetailPage;
