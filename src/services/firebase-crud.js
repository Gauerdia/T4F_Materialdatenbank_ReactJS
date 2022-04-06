import { db, storage } from "./firebase-config"
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    query, where,
} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytesResumable, list} from "firebase/storage";
import React, {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {getCurrentDate} from "./getCurrentDate";



///  CREATE



export const createCreationCategorySelectionEntry = async(category, label, value) =>{

    const collectionRef = collection(db, "creationCategorySelection");
    await addDoc(
        collectionRef,
        {
            category: category,
            label: label,
            value: value
        });
}


export const createBNEMaterialFormSubmit = async(values, file, topics) => {

    const newId = uuidv4();

    let topicsToSave = [];

    // MultiSelector creates an array to store the elements. If the
    // input is empty we only want a string to be stored.
    if(Object.keys(topics).length === 0){
        topicsToSave = "";
    }else{
        topics.map((item) =>{
            if (Object.keys(topicsToSave).length === 0){
                topicsToSave = item.value;
            }else{
                topicsToSave = topicsToSave + "," + item.value;
            }
        })
    }

    if(file.name === undefined){
        createBNAMaterialEntry(values, "", topicsToSave)
    }else{
        uploadFilesWithoutDescription(file, values, topicsToSave)
    }

}

const createBNAMaterialEntry = async(values, downloadUrl, topicsToSave) =>{

    const BNEMaterialCollectionRef = collection(db, "BNEMaterial");

    let urlToSave = ""

    // CHeck, if we need to add the "https" or not
    if(values["url"].includes("http") || values["url"] === ""){
        urlToSave = values["url"];
    }else{
        urlToSave = "https://" + values["url"];
    }

    await addDoc(
        BNEMaterialCollectionRef,
        {
            name: values["name"],
            author: values["author"],
            description: values["description"],
            email: values["email"],
            evaluation: values['evaluation'],
            evaluationConcept:[],
            evaluationState:0,
            evaluationTested:[],
            evaluationConceptIds: [""],
            evaluationTestedIds: [""],
            examinedBy: '',
            externExaminationName:'',
            externExaminationEMail:'',
            foundBy:sessionStorage.getItem('login_id'),
            keywords: values['keywords'],
            level:values["level"],
            licence:values["licence"],
            organisation:values["organisation"],
            proofEvaluation:'',
            proofLicence:'',
            shortTitle:'',
            title:values['title'],
            topic:topicsToSave,
            url:urlToSave,
            downloadUrl: downloadUrl
        }).then(afterUpload());
}


export const createUser = async(id, name, email, experience) =>{

    await setDoc(
        doc(db, "users", id),
        {
            name: name,
            email: email,
            role: 0,
            experience: experience
        },
    ).then(() => {
        console.log("User creation succcessful.")
    }).catch((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: ", errorCode, ". Error message: ", errorMessage)
    });
}

// Firebase-CRUD-Operations
export const createDescription = async (id, description) => {
    //await addDoc(fileInformationCollectionRef, { description: description }, id);
    await setDoc(doc(db,"fileInformation", id),{ description: description })
        .catch((error) => {
            console.log(error);
        })
};

export const createComment = async(content, creatorId, creatorName, materialId) =>{

    const commentCollectionRef = collection(db, "comments");

    let dateToSort = getCurrentDate()
    dateToSort = dateToSort.replace('.','0')
    dateToSort = dateToSort.replace('.','0')
    dateToSort = "9" + dateToSort

    return await addDoc(
        commentCollectionRef,
        {
            content: content,
            creatorId: creatorId,
            creatorName: creatorName,
            materialId: materialId,
            date: getCurrentDate(),
            dateToSort: dateToSort

        })
        .catch((error) => {
            console.log(error);
        })
}


///  UPLOAD



export const uploadFilesWithoutDescription = async(file,values, topicsToSave) => {

    // If there is no file to upload
    if(!file) return;

    console.log("filename: " + file.name)
    // Get the storage reference
    const storageRef = ref(storage, `/files/${file.name}`);
    // Create an upload task
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Set a var to return the URL
    let downloadURL = ""
    // Start the upload
    await uploadTask.on("state_changed", (snapshot) => {
            // Calculate the progress to display it
            //const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            //console.log(prog)
            //setProgress(prog);
        }, (err) => console.log("Error: " + err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    console.log("Uploaded completed with url: " + url)
                    //const id = url.substring(url.lastIndexOf("token=") + 6, url.length)
                    createBNAMaterialEntry(values, url, topicsToSave)
                })
        });

}

export const uploadFilesWithDescription = (file, uploadFileDescription) => {
    if(!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(prog)
            //setProgress(prog);
        }, (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    console.log("Uploaded completed with url: " + url)
                    const id = url.substring(url.lastIndexOf("token=") + 6, url.length)
                    createDescription(id, uploadFileDescription)
                })
        });
}



/// GET




export const getCreationCategorySelection = async () => {
    return await getDocs(query(collection(db, "creationCategorySelection")));
}

// Fetches all the file descriptions
export const getUsers = async () => {
    return await getDocs(query(collection(db, "users")));
};


// Get the files which are stored on firebase storage
export const GetFileList = async() =>{

    // Define which folder we want to fetch
    const listRef = ref(storage, 'files/');

    // Save the downloadLinks to return them
    const [downloadLinks, setDownloadLinks] = useState([]);

    // We only fetch 10
    await list(
        listRef, {maxResults: 10}
    ).then(
        (res) => {
            res.items.forEach((item) => {
                // We get the download link for each
                getDownloadURL(ref(storage, item))
                    .then((url) => {
                        // log this link
                        console.log("getFileList-URL: " + url)
                        setDownloadLinks(old => [...old, url])
                    })
                });

            }
        );
    return downloadLinks;
};

// Fetches all the file descriptions
export const getFileDescriptions = async () => {
    return await getDocs(query(collection(db, "fileInformation")));
};

// Fetches all the comments with this particular Id
export const getComments = async(id) => {
    const q = query(collection(db, "comments"), where("materialId", "==", id))
    return getDocs(q);
}

// Fetch the material with this specific id
export const getSpecificMaterial = async(id) => {
    const docRef = doc(db, "BNEMaterial", id);
    // const q = await query(collection(db, "BNEMaterial").doc(id).get())
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    }else{
        console.log("Document could not be found");
    }
}

export const getUnexaminedMaterial = async() => {
    return await getDocs(
        query(
            collection(db, "BNEMaterial"),
            where("examinedBy", "==", "")
        )
    );
}



/// UPDATE



export const addConceptEvaluation = async(rating, material, conceptIds) => {

    let docRef = doc(db, "BNEMaterial", material.id);

    return await setDoc(docRef,{
        name: material.name,
        author: material.author,
        description: material.description,
        email: material.email,
        evaluation: material.evaluation,
        evaluationConcept: rating,
        evaluationConceptIds: conceptIds,
        evaluationState: material.evaluationState,
        evaluationTested: material.evaluationTested,
        evaluationTestedIds: material.evaluationTestedIds,
        examinedBy: material.examinedBy,
        externExaminationName:material.externExaminationName,
        externExaminationEMail:material.externExaminationEMail,
        foundBy:material.foundBy,
        keywords: material.keywords,
        level:material.level,
        licence:material.licence,
        organisation: material.organisation,
        proofEvaluation: material.proofEvaluation,
        proofLicence: material.proofLicence,
        shortTitle: material.shortTitle,
        title: material.title,
        topic:material.topic,
        url: material.url,
        downloadUrl: material.downloadUrl

    })
}

export const addTestedEvaluation = async(rating, material, testedIds) => {

    let docRef = doc(db, "BNEMaterial", material.id);

    return await setDoc(docRef,{
        name: material.name,
        author: material.author,
        description: material.description,
        email: material.email,
        evaluation: material.evaluation,
        evaluationConcept: material.evaluationConcept,
        evaluationConceptIds: material.evaluationConceptIds,
        evaluationState: material.evaluationState,
        evaluationTested: rating,
        evaluationTestedIds: testedIds,
        examinedBy: material.examinedBy,
        externExaminationName:material.externExaminationName,
        externExaminationEMail:material.externExaminationEMail,
        foundBy:material.foundBy,
        keywords: material.keywords,
        level:material.level,
        licence:material.licence,
        organisation: material.organisation,
        proofEvaluation: material.proofEvaluation,
        proofLicence: material.proofLicence,
        shortTitle: material.shortTitle,
        title: material.title,
        topic:material.topic,
        url: material.url,
        downloadUrl: material.downloadUrl

    })
}

export const ApproveMaterial = async(material) => {
    return await setDoc(doc(db, "BNEMaterial", material.id),{
        name: material.name,
        author: material.author,
        description: material.description,
        email: material.email,
        evaluation: material.evaluation,
        evaluationConcept: material.evaluationConcept,
        evaluationConceptIds: material.evaluationConceptIds,
        evaluationState: material.evaluationState,
        evaluationTested: material.evaluationTested,
        evaluationTestedIds: material.evaluationTestedIds,
        examinedBy: sessionStorage.getItem('login_id'),
        externExaminationName:'',
        externExaminationEMail:'',
        foundBy:material.foundBy,
        keywords: material.keywords,
        level:material.level,
        licence:material.licence,
        organisation: material.organisation,
        proofEvaluation: material.proofEvaluation,
        proofLicence: material.proofLicence,
        shortTitle: material.shortTitle,
        title: material.title,
        topic:material.topic,
        url: material.url,
        downloadUrl: material.downloadUrl
    });
}



/// MISC



function afterUpload(){
    //window.location.reload(false);
    alert("Das Material wurde erfolgreich hinzufügt");
}