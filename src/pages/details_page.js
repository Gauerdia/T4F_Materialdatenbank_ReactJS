// import React, {useEffect, useState} from 'react';
// import {useParams} from 'react-router-dom';
// import {collection, getDocs, query} from "firebase/firestore";
// import {db} from "../services/firebase-config";
// import {FaArrowRight, FaRegStar} from "react-icons/fa";
//
// import '../styles/DetailsPage.css';
//
// function DetailPage(){
//
//     const [material, setMaterial] = useState([]);
//
//     let {id} = useParams();
//
//     // Fetches Firestore data to display it
//     useEffect(() => {
//         const getMaterial = async () => {
//             const data = await getDocs(query(collection(db, "BNEMaterial")));
//             setMaterial(
//                 data.docs.map(
//                     (doc) =>
//                         (
//                             {...doc.data(), id: doc.id}
//                         )
//                 )
//             );
//         };
//         getMaterial();
//     }, []);
//
//
//     return (
//         <div>
//             <h3>Detail Page </h3>
//             <p> Hier müssen wir schauen, ob die Formatierung mit späteren Eingaben harmonieren. Ich bin mir jetzt schon
//             relativ sicher, dass wir an dem Beschreibungs-Feld ansetzen müssen. Aber so haben wir erst einmal einen
//             Ansatzpunkt, wie es übersichtlich aussehen könnte. </p>
//             {material.map((material) => {
//                 if(material.id === id){
//                     return(
//                         <div className="MainDiv">
//                             <div className="leftColumn">
//                                 <p> </p>
//                             </div>
//                             <div className="mainColumn">
//                                 <div className="DetailsDiv">
//
//
//                                     <div>
//                                         <p>
//                                             Allgemeine Informationen
//                                         </p>
//                                     </div>
//
//                                     <div>
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Name:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexCategoryRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">AutorIn:</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.name !== "" ? material.name : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexValueRight">
//                                                 <p className="detailValueDiv">{material.author !== "" ? material.author : "Keine Angabe"}</p>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Organisation:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexCategoryRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">E-Mail Adresse:</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.organisation !== "" ? material.organisation : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexValueRight">
//                                                 <p className="detailValueDiv">{material.email !== "" ? material.email : "Keine Angabe"}</p>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Lizenz:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexCategoryRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Titel:</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.licence !== "" ? material.licence : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexValueRight">
//                                                 <p className="detailValueDiv">{material.title !== "" ? material.title : "Keine Angabe"}</p>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Themengebiet:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexCategoryRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Schlagworte:</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.topic !== "" ? material.topic : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexValueRight">
//                                                 <p className="detailValueDiv">{material.keywords !== "" ? material.keywords : "Keine Angabe"}</p>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Evaluation:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexCategoryRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">URL:</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.evaluation !== "" ? material.evaluation : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexValueRight">
//                                                 <p className="detailValueDiv">
//                                                     <a  href={material.url !== "" ? material.url : ""}>Link</a>
//                                                 </p>
//
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Dateianhang:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader"> </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">
//                                                     <a  href={material.downloadUrl !== "" ? material.downloadUrl : ""}>Link</a>
//                                                 </p>
//
//                                             </div>
//                                             <div className="detailFlexRight">
//                                                 <p className="detailValueDiv"> </p>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexCategoryLeft">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader">Beschreibung:</p>
//                                                 </div>
//                                             </div>
//                                             <div className="detailFlexRight">
//                                                 <div className="detailCategoryDiv">
//                                                     <p className="textHeader"> </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <div className="detailFlexParent">
//                                             <div className="detailFlexValueLeft">
//                                                 <p className="detailValueDiv">{material.description !== "" ? material.description : "Keine Angabe"}</p>
//                                             </div>
//                                             <div className="detailFlexRight">
//                                                 <p className="detailValueDiv"> </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//
//
//
//
//
//                                 <div className="DetailsDiv">
//
//
//                                     <div>
//                                         <p>
//                                             Evaluation
//                                         </p>
//                                     </div>
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexCategoryLeft">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Bewertung des Konzepts:</p>
//                                             </div>
//                                         </div>
//                                         <div className="detailFlexCategoryRight">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Bewertung nach Erprobung:</p>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexValueLeft">
//                                             <div className="detailStarDiv">
//                                                 <FaRegStar color={material.evaluationConcept > 0 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationConcept > 1 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationConcept > 2 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationConcept > 3 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationConcept > 4 ? "green" : "black"} size={28}/>
//                                             </div>
//                                         </div>
//                                         <div className="detailFlexValueRight">
//                                             <div className="detailStarDiv">
//                                                 <FaRegStar color={material.evaluationTesting > 0 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationTesting > 1 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationTesting > 2 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationTesting > 3 ? "green" : "black"} size={28}/>
//                                                 <FaRegStar color={material.evaluationTesting > 4 ? "green" : "black"} size={28}/>
//                                             </div>
//                                         </div>
//                                     </div>
//
//
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexCategoryLeft">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Gefunden von:</p>
//                                             </div>
//                                         </div>
//                                         <div className="detailFlexCategoryRight">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Begutachtet von:</p>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexValueLeft">
//                                             <p className="detailValueDiv">{material.foundBy !== "" ? material.foundBy : "Keine Angabe"}</p>
//                                         </div>
//                                         <div className="detailFlexValueRight">
//                                             <p className="detailValueDiv">{material.examinedBy !== "" ? material.examinedBy : "Keine Angabe"}</p>
//                                         </div>
//                                     </div>
//
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexCategoryLeft">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Nachweis der Begutachtung:</p>
//                                             </div>
//                                         </div>
//                                         <div className="detailFlexCategoryRight">
//                                             <div className="detailCategoryDiv">
//                                                 <p className="textHeader">Nachweis der Lizenz:</p>
//                                             </div>
//                                         </div>
//                                     </div>
//
//                                     <div className="detailFlexParent">
//                                         <div className="detailFlexValueLeft">
//                                             <p className="detailValueDiv">{material.proofEvaluation !== "" ? material.proofEvaluation : "Keine Angabe"}</p>
//                                         </div>
//                                         <div className="detailFlexValueRight">
//                                             <p className="detailValueDiv">{material.proofLicence !== "" ? material.proofLicence : "Keine Angabe"}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//
//                             </div>
//                             <div className="rightColumn">
//                                 <p> </p>
//                             </div>
//                         </div>
//                     )
//                 }
//             })}
//         </div>
//     )
// }
//
//
// export default DetailPage;
