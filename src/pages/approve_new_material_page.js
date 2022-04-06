import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {BsFileEarmarkSpreadsheet} from 'react-icons/bs';
import {ApproveMaterial, getUnexaminedMaterial, getUsers} from "../services/firebase-crud";

import '../styles/Approve.css';

function ApproveNewMaterialPage() {

    let navigate = useNavigate();
    const [material, setMaterial] = useState([]);
    const [users, setUsers] = useState([]);

    // When app is started
    useEffect(() => {
        fetchUnexaminedMaterial()
            .then(
                fetchUsers()
            )
    },[]);

    // fetch the material not yet examined
    const fetchUnexaminedMaterial = async () => {
        const data = await getUnexaminedMaterial();
        setMaterial(
            data.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
    };

    const fetchUsers = async() => {
        const data = await getUsers();
        setUsers(
            data.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
    }


    // When the button is pushed we save the approval to the database
    function handleApproveMaterial(){
        ApproveMaterial(material).then((result) => {
            alert("Mitglied wurde erfolgreich freigegeben.")
            navigate('/home')
        });
    }


    return (
        <div className="ApproveMemberMainDiv">
            <div className="ApproveMemberHeader">
                <p>
                    Freigabe von neuem Material
                </p>
            </div>
            <div className="ApproveMemberContent">



                <div className="approveMaterialTest">
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            Name
                        </p>
                    </div>
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            AutorIn
                        </p>
                    </div>
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            Gefunden von
                        </p>
                    </div>
                    <div className="approveMaterialTitleLeftColumn">
                        <p>
                            Details
                        </p>
                    </div>
                    <div className="approveMaterialTitleRightColumn">
                        <p>
                            Freigeben
                        </p>
                    </div>
                </div>



                {material.filter( material =>{
                    // We want only the material no one has examined until now
                    return material.examinedBy === ""
                }).map((material) => (
                    <div className="approveMaterialTest">
                        <div className="approveMaterialLeftColumn">
                            <p>
                                {material.name}
                            </p>
                        </div>
                        <div className="approveMaterialLeftColumn">
                            <p>
                                {material.author}
                            </p>
                        </div>
                        <div className="approveMaterialLeftColumn">
                            {users.filter(user => {
                                return material.foundBy === user.id
                            }).map(
                                user => (
                                    <p>
                                        {user.name}
                                    </p>
                                )
                            )}
                        </div>
                        <div className="approveMaterialLeftColumnIcon">
                            <p>
                                <Link
                                    to={`/privateSearch/details/${material.id}`}
                                    state={{material}}
                                >
                                    <button className="approveButton">
                                        <BsFileEarmarkSpreadsheet className="approveIcon"/>
                                    </button>
                                </Link>
                            </p>
                        </div>
                        <div className="approveMaterialRightColumnIcon">
                            <p>
                                <button className="approveButton" onClick={() => handleApproveMaterial}>
                                    <AiOutlineCheckCircle className="approveIcon"/>
                                </button>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApproveNewMaterialPage;
