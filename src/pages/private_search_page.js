import {TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../services/firebase-config";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaRegStar} from "react-icons/fa";
import {FaArrowRight} from 'react-icons/fa';
import {calculateMean} from "../services/mathUtils";

import '../styles/FilterPage.css';

function PrivateSearchPage(props) {

    let navigate = useNavigate();
    let location = useLocation()

    const [titleData, setTitleData] = useState(
        ["Nichts ausgewählt", "Material", "Aufgabenblatt", "Stundenentwurf", "Unterrichtseinheit",
            "Lerngruppen-Projekt", "Außerschulischer Lernort", "Schulprojekt","Arbeitsgemeinschaft"])
    const [levelData, setLevelData] = useState(
        ["Nichts ausgewählt","Basis", "Erweitert", "Experten"]
    )
    const [evaluationData, setEvaluationData] = useState(
        ["Nichts ausgewählt","Entwurf", "Konzept", "Begutachtet", "Erprobt"]
    )
    const [licenceData, setLicenceData] = useState(
        ["Nichts ausgewählt", "CC", "Copyright-geschützt"]
    )

    const [material, setMaterial] = useState([]);

    const [searchNameQuery, setSearchNameQuery] = useState("")
    const [searchAuthorQuery, setSearchAuthorQuery] = useState("")
    const [searchOrganisationQuery, setSearchOrganisationQuery] = useState("")
    const [searchKeywordsQuery, setSearchKeywordsQuery] = useState("")
    const [searchTopicQuery, setSearchTopicQuery] = useState("")
    const [searchEvaluationQuery, setSearchEvaluationQuery] = useState("")
    const [searchLevelQuery, setSearchLevelQuery] = useState("")
    const [searchTitleQuery, setSearchTitleQuery] = useState("")
    const [searchLicenceQuery, setSearchLicenceQuery] = useState("")

    const [userName, setUserName] = useState([]);

    // const yellowStarStyle = {color: "yellow", fontSize:"1.5em"}
    // const darkStarStyle = {color: "black", fontSize:"1.5em"}

    const getMaterial = async () => {
        const data = await getDocs(query(collection(db, "BNEMaterial")));
        setMaterial(
            data.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
    };

    // Fetches Firestore data to display it
    useEffect(() => {
        getMaterial();
        setUserName(props.userName);
    }, []);


    return (
        <div className="privateSearchMain">


            {/*HEADER*/}


            <div className="privateSearchHeader">
                <p className="filterPageHeader">
                    Materialsuche
                </p>
            </div>


                <div className="privateSearchFilterDivParent">


                    {/*LEFT SIDE*/}


                    <div className="privateFilterDivLeft">
                        <table>
                            <tbody>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr className="privateFilterMoeglichkeiten">
                                <td >
                                    Filtermöglichkeiten
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Name"
                                        variant="outlined"
                                        onChange={event => setSearchNameQuery(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="author"
                                        name="author"
                                        type="text"
                                        label="AutorIn"
                                        variant="outlined"
                                        onChange={event => setSearchAuthorQuery(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="organisation"
                                        name="organisation"
                                        type="text"
                                        label="Organisation"
                                        variant="outlined"
                                        onChange={event => setSearchOrganisationQuery(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="keywords"
                                        name="keywords"
                                        type="text"
                                        label="Schlagworte"
                                        variant="outlined"
                                        onChange={event => setSearchKeywordsQuery(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        id="topic"
                                        name="topic"
                                        type="text"
                                        label="Themengebiet"
                                        variant="outlined"
                                        onChange={event => setSearchTopicQuery(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    Evaluation
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        name="evaluation"
                                        id="evaluation"
                                        onChange={event => setSearchEvaluationQuery(event.target.value)}
                                    >
                                        {evaluationData.map((evaluation) => (
                                            <option value={evaluation}>{evaluation}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    Niveau
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        name="level"
                                        id="level"
                                        onChange={event => setSearchLevelQuery(event.target.value)}
                                    >
                                        {levelData.map((level) => (
                                            <option value={level}>{level}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    Titel
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        name="title"
                                        id="title"
                                        onChange={event => setSearchTitleQuery(event.target.value)}
                                    >
                                        {titleData.map((title) => (
                                            <option value={title}>{title}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    Lizenz
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        name="licence"
                                        id="licence"
                                        onChange={event => setSearchLicenceQuery(event.target.value)}
                                    >
                                        {licenceData.map((licence) => (
                                            <option value={licence}>{licence}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <p>

                                </p>
                            </tr>
                            <tr>
                                <td>
                                    <p>  </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>


                    {/*RIGHT SIDE*/}


                    <div className="filterDivRight">
                        <div>
                            {material.filter(material => {

                                // We iterate through all criteria and if one of them is off, we set this variable
                                // so that nothing will be returned
                                let materialFitsCriteria = 1;

                                if (searchNameQuery !== ""){
                                    if(!material.name.toLowerCase().includes(searchNameQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchAuthorQuery !== ""){
                                    if(!material.author.toLowerCase().includes(searchAuthorQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchOrganisationQuery !== ""){
                                    if(!material.organisation.toLowerCase().includes(searchOrganisationQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchKeywordsQuery !== ""){
                                    if(!material.keywords.toLowerCase().includes(searchKeywordsQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchTopicQuery !== ""){
                                    if(!material.topic.toLowerCase().includes(searchTopicQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchEvaluationQuery !== "" && searchEvaluationQuery !== "Nichts ausgewählt"){
                                    if(!material.evaluation.toLowerCase().includes(searchEvaluationQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchLevelQuery !== "" && searchLevelQuery !== "Nichts ausgewählt"){
                                    if(!material.level.toLowerCase().includes(searchLevelQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchTitleQuery !== "" && searchTitleQuery !== "Nichts ausgewählt"){
                                    if(!material.title.toLowerCase().includes(searchTitleQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                if (searchLicenceQuery !== "" && searchLicenceQuery !== "Nichts ausgewählt"){
                                    if(!material.licence.toLowerCase().includes(searchLicenceQuery.toLowerCase())){
                                        materialFitsCriteria = 0;
                                    }
                                }
                                // If none of the filters exclude our material, we display it
                                if(materialFitsCriteria){
                                    return material;
                                }

                                // If the item satisfies the filter, it is going to be displayed
                            }).map((material, index) => (
                                <div key={material.id}>
                                    <table className="filterTable">
                                        <tbody>
                                        <tr className="filterCategoryRow">
                                            <td className="filterNameTd">
                                                <p className="filterResultCategory">
                                                    Name
                                                </p>
                                            </td>
                                            <td className="filterAuthorTd">
                                                <p className="filterResultCategory">
                                                    AutorIn
                                                </p>
                                            </td>
                                            <td className="filterEvaluationTd">
                                                <p className="filterResultCategory">
                                                    Konzeptbewertung
                                                </p>
                                            </td>
                                            <td className="filterArrowTd">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="filterNameTd">
                                                <p className="filterResultText">
                                                    {material.name}
                                                </p>
                                            </td>
                                            <td className="filterAuthorTd">
                                                <p className="filterResultText">
                                                    {material.author}
                                                </p>
                                            </td>
                                            <td className="filterEvaluationTd">
                                                <FaRegStar color={calculateMean(material.evaluationConcept) > 0 ? "green" : "black"} />
                                                <FaRegStar color={calculateMean(material.evaluationConcept) > 1 ? "green" : "black"}/>
                                                <FaRegStar color={calculateMean(material.evaluationConcept) > 2 ? "green" : "black"}/>
                                                <FaRegStar color={calculateMean(material.evaluationConcept) > 3 ? "green" : "black"}/>
                                                <FaRegStar color={calculateMean(material.evaluationConcept) > 4 ? "green" : "black"}/>
                                            </td>
                                            <td className="filterArrowTd">
                                                <Link
                                                    to={`/privateSearch/details/${material.id}`}
                                                    state={{material, userName}}
                                                >
                                                    <FaArrowRight/>
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default PrivateSearchPage;
