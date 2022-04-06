import React, {useEffect, useState} from "react";
import {TextField } from '@material-ui/core';
import {useFormik} from 'formik';
import Tooltip from "@material-ui/core/Tooltip";

import {MultiSelect} from 'react-multi-select-component';

import {
    createBNEMaterialFormSubmit,
    getCreationCategorySelection,
    getSpecificMaterial
} from "../services/firebase-crud";

import '../styles/Create.css';

function CreateBNEMaterial() {


    const [categories, setCategories] = useState([]);

    const [titles, setTitles] = useState([]);

    const [file, setFile] = useState("");

    // const titleData = [
    //     "Material", "Aufgabenblatt", "Stundenentwurf", "Unterrichtseinheit",
    //     "Lerngruppen-Projekt", "Außerschulischer Lernort", "Schulprojekt","Arbeitsgemeinschaft"
    // ]
    // const licenceData = [
    //     "CC",
    //     "Copyright-geschützt"
    // ]
    // const topicData = [
    //     {label: "Klima", value: 'Klima'},
    //     {label: "Biodiversität", value: 'Biodiversität'},
    //     {label: "Energiewende", value: 'Energiewende'},
    //     {label: "Agrarwende", value: 'Agrarwende'},
    //     {label: "Verkehrswende", value: 'Verkehrswende'},
    //     {label: "Wärmewende", value: 'Wärmewende'},
    //     {label: "Industriewende", value: 'Industriewende'},
    //     {label: "Chemiewende", value: 'Chemiewende'},
    //     {label: "Green Economy", value: 'Green Economy'},
    //     {label: "Greenwashing", value: 'Greenwashing'},
    //     {label: "Desinformation", value: 'Desinformation'},
    //     {label: "Gesellschaftliche Transformation", value: 'Gesellschaftliche Transformation'},
    //     {label: "Klimapsychologie", value: 'Klimapsychologie'},
    //     {label: "Carbon Bubble", value: 'Carbon Bubble'}
    // ]
    // const levelData = [
    //     "Basis", "Erweitert", "Experten"
    // ]
    // const evaluationData = [
    //     "Entwurf", "Konzept", "Begutachtet", "Erprobt"
    // ]

    const [multiSelectionValue, setMultiSelectionValue] = useState([]);

    // Init formik
    const formik = useFormik({
        initialValues: {
            name: "",
            author: '',
            organisation: '',
            email: '',
            licence:'CC',
            //shortTitle: 'Mat',
            title: 'Material',
            topic:'',
            otherTopic: '',
            ownTopic:'',
            keywords:'',
            level:'Basis',
            description: '',
            url:'',
            evaluation:'Entwurf',
            evaluationConcept: 0
        },
        // validate,
        onSubmit: values => {
            createBNEMaterialFormSubmit(values, file, multiSelectionValue);

        },
    });

    // Fetches Firestore data to display it
    useEffect(() => {
        fetchCategories();

    }, []);

    const fetchCategories = async() =>{
        const data = await getCreationCategorySelection();
        setCategories(
            data.docs.map(
                (doc) =>
                    (
                        {...doc.data(), id: doc.id}
                    )
            )
        );
        setTitles(
            data.docs.filter( data => {
                console.log(data.data())
                return data.data().category == "topicData"
            }).map((doc) => (
                {
                    ...doc.data(), id:doc.id
                }
            ))
        )
    }

    return (
        <div className="App">


            {/*HEADER*/}

            <div className="createHeader">
                <p className="customHeaderText">Create new material</p>
            </div>

            <div>
                {categories ?
                    (
                        <form onSubmit={formik.handleSubmit}>
                            <Tooltip
                                title="Was wäre ein aussagekräftiger Titel für dieses Material?"
                                placement="top">
                                <label htmlFor="name" className="firstLabel">Name</label>
                            </Tooltip>

                            <TextField
                                id="name"
                                name="name"
                                type="text"
                                label="Name"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            <Tooltip
                                title="Wie heißt die Person, die dieses Material hinzufügt?"
                                placement="top">
                                <label htmlFor="author" className="midLabel">AutorIn</label>
                            </Tooltip>

                            <TextField
                                id="author"
                                name="author"
                                type="text"
                                label="AutorIn"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.author}
                            />
                            <Tooltip
                                title="Wie heißt die Organisation, für die der Autor arbeitet?"
                                placement="top">
                                <label htmlFor="lastName" className="midLabel">
                                    Organisation
                                </label>
                            </Tooltip>
                            <TextField
                                id="organisation"
                                name="organisation"
                                type="text"
                                variant="outlined"
                                label="Organisation"
                                className="customTextField"
                                onChange={formik.handleChange}
                                value={formik.values.organisation}
                            />
                            <Tooltip
                                title="Wie kann man den Autor erreichen?"
                                placement="top">
                                <label htmlFor="email" className="midLabel">E-Mail Adresse</label>
                            </Tooltip>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                variant="outlined"
                                label="E-Mail"
                                className="customTextField"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <Tooltip
                                title="Unter welchem Schlagwort kann man das Material schnell finden?"
                                placement="top">
                                <label htmlFor="keyword" className="customTextField">Schlagworte</label>
                            </Tooltip>
                            <TextField
                                id="keywords"
                                name="keywords"
                                type="text"
                                variant="outlined"
                                className="customTextField"
                                label="Schlagworte"
                                onChange={formik.handleChange}
                                value={formik.values.keywords}
                            />

                            <Tooltip
                                title="Wie lautet das Themengebiet des Materials?"
                                placement="top">
                                <label
                                    htmlFor="shortTitle"
                                    className="customTextField"
                                >
                                    Themengebiet
                                </label>
                            </Tooltip>
                            <MultiSelect
                                value= {multiSelectionValue}
                                name="topic"
                                id="topic"
                                className="customTextField"
                                onChange={setMultiSelectionValue}
                                labelledBy="Test"
                                options={titles}
                                    // options={topicData}
                                />
                            <Tooltip
                                title="Für wen ist das Material gedacht?"
                                placement="top">
                                <label htmlFor="level" className="customTextField">Niveau</label>
                            </Tooltip>
                            <select
                                value={formik.values.level}
                                name="level"
                                id="level"
                                className="customTextField"
                                onChange={formik.handleChange}>

                                {categories.filter( category => {
                                    return category.category == "levelData"
                                }).map((levelData) => (
                                    <option value={levelData.value}>{levelData.value}</option>
                                ))}

                                {/*{levelData.map((level) => (*/}
                                {/*    <option value={level}>{level}</option>*/}
                                {/*))}*/}
                            </select>
                            <Tooltip
                                title="Wie ausgereift ist das Material?"
                                placement="top">
                                <label htmlFor="level" className="customTextField">Evaluation</label>
                            </Tooltip>
                            <select
                                value={formik.values.evaluation}
                                name="evaluation"
                                id="evaluation"
                                className="customTextField"
                                onChange={formik.handleChange}>
                                {categories.filter( category => {
                                    return category.category == "evaluationData"
                                }).map((evaluationData) => (
                                    <option value={evaluationData.value}>{evaluationData.value}</option>
                                ))}


                                {/*{evaluationData.map((evaluation) => (*/}
                                {/*    <option value={evaluation}>{evaluation}</option>*/}
                                {/*))}*/}
                            </select>

                            <Tooltip
                                title="Welche Lizenz ist hier zu beachten?"
                                placement="top">
                                <label
                                    htmlFor="shortTitle"
                                    className="customTextField"
                                >
                                    Lizenz
                                </label>
                            </Tooltip>
                            <select
                                value={formik.values.licence}
                                name="licence"
                                id="licence"
                                className="customTextField"
                                onChange={formik.handleChange}>
                                {categories.filter( category => {
                                    return category.category == "licenceData"
                                }).map((licence) => (
                                    <option value={licence.value}>{licence.value}</option>
                                ))}


                                {/*{users.filter( user =>{*/}
                                {/*    // We only want the users that can be 'promoted'*/}
                                {/*    return user.role === 0*/}
                                {/*}).map((user) => (*/}

                                {/*{licenceData.map((licence) => (*/}
                                {/*    <option value={licence}>{licence}</option>*/}
                                {/*))}*/}

                            </select>

                            <Tooltip
                                title="In welche Rubrik fällt das, was hochgeladen werden soll?"
                                placement="top">
                                <label
                                    htmlFor="shortTitle"
                                    className="customTextField"
                                >
                                    Titel
                                </label>
                            </Tooltip>
                            <select
                                value={formik.values.title}
                                name="title"
                                id="title"
                                className="customTextField"
                                onChange={formik.handleChange}>

                                {categories.filter( category => {
                                    return category.category == "titleData"
                                }).map((titleData) => (
                                    <option value={titleData.value}>{titleData.value}</option>
                                ))}

                                {/*{titleData.map((title) => (*/}
                                {/*    <option value={title}>{title}</option>*/}
                                {/*))}*/}
                            </select>

                            <Tooltip
                                title="Was gibt es über das Material zu wissen?"
                                placement="top">
                                <label
                                    htmlFor="description"
                                    className="midLabel"
                                >
                                    Beschreibung
                                </label>
                            </Tooltip>
                            <TextField
                                id="description"
                                name="description"
                                type="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                variant="outlined"
                                label="Beschreibung"
                                className="customTextField"
                            />
                            <Tooltip
                                title="Wie lautet der Link zu dem Material?"
                                placement="top">
                                <label
                                    htmlFor="url"
                                    className="midLabel"
                                >
                                    URL
                                </label>
                            </Tooltip>
                            <TextField
                                id="url"
                                name="url"
                                type="text"
                                variant="outlined"
                                className="customTextField"
                                label="URL"
                                onChange={formik.handleChange}
                                value={formik.values.url}
                            />
                            <Tooltip
                                title="Möchten Sie statt einem Link eine Datei hochladen?"
                                placement="top">
                                <label
                                    htmlFor="title"
                                    className="customTextField"
                                >
                                    Dateianhang
                                </label>
                            </Tooltip>

                            <input
                                type="file"
                                id="attachement"
                                name="attachement"
                                className="customTextField"
                                onChange={(e)=>{setFile(e.target.files[0])}}
                            />
                            <button type="submit" className="submitButton">Abschicken</button>
                        </form>
                    )
                :(
                    <div>
                        <p>
                            Wird geladen
                        </p>
                    </div>
                    )}
            </div>
        </div>
    );
}

export default CreateBNEMaterial;
