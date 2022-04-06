import React, {useEffect, useState} from "react";
import {collection, doc, getDocs, setDoc, query} from "firebase/firestore";
import {db} from "../services/firebase-config";
import {AiOutlineCheckCircle} from 'react-icons/ai';

import '../styles/Approve.css';

function ApproveNewMembersPage() {

    // let navigate = useNavigate();

    const [users, setUsers] = useState([]);


    // When app is started
    useEffect(() => {
        getUsers();
    },[]);


    // Fetch users from server
    const getUsers = async () => {
        const users = await getDocs(query(collection(db, "users")));
        // Save the saved users in a local array
        setUsers(
            users.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
    };

    // When clicked on button, we raise his role on the server
    const approveUser = async(email, experience, name, id) => {
        await setDoc(doc(db, "users", id),{
            email: email,
            experience: experience,
            name: name,
            role: 1
        }).then((result) => {
            alert("Mitglied wurde erfolgreich freigegeben.")
            window.location.reload(false);
        })
    }

    return (
        <div className="ApproveMemberMainDiv">
            <div className="ApproveMemberHeader">
                <p>
                    Freigabe von neuen Mitgliedern
                </p>
            </div>
            <div className="ApproveMemberContent">



                <div className="approveMemberRow">
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            Name
                        </p>
                    </div>
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            E-Mail
                        </p>
                    </div>
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            Berufserfahrung
                        </p>
                    </div>
                    <div className="approveMaterialTitleRightColumn">
                        <p>
                            Freigeben
                        </p>
                    </div>
                </div>



                {users.filter( user =>{
                    // We only want the users that can be 'promoted'
                    return user.role === 0
                }).map((user) => (


                    <div className="approveMemberRow">
                        <div className="approveMaterialLeftColumn">
                            <p>
                                {user.name}
                            </p>
                        </div>
                        <div className="approveMaterialLeftColumn">
                            <p>
                                {user.email}
                            </p>
                        </div>
                        <div className="approveMaterialLeftColumn">
                            <p>
                                {user.experience ? user.experience !== "" ? user.experience : "Keine Angabe" : "Wird geladen"}
                            </p>
                        </div>
                        <div className="approveMaterialRightColumnIcon">
                            <p>
                                <AiOutlineCheckCircle
                                    onClick={() => approveUser(user.email, user.experience, user.name, user.id)}
                                />
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default ApproveNewMembersPage;
