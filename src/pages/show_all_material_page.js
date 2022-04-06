// import React, {useEffect, useState} from "react";
// import {collection, getDocs, query} from "firebase/firestore";
// import {db} from "../services/firebase-config";
// import ReactStars from "react-rating-stars-component";
// import {FaArrowRight} from 'react-icons/fa';
// import {Link} from 'react-router-dom';
//
// import '../styles/allMaterial.css';
//
// function ShowAllMaterial() {
//
//     const [material, setMaterial] = useState([]);
//
//     const ratingChangedEvaluationConcept = (newRating) => {
//         console.log(newRating);
//     };
//
//     // Fetches Firestore data to display it
//     useEffect(() => {
//         console.log("useEffect in Home")
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
//         console.log("useEffect in Home, material: " + material);
//     }, []);
//
//
//
//     return (
//         <div className="App">
//             <div className="customHeader">
//                 <h1>All Material</h1>
//                 <p>Hier wäre interessant, was auf den ersten Blick zu sehen sein sollte.</p>
//                 <p>Ich denke, dass Namen und Autoren in jedem Fall zu sehen seien sollten. Die Bewertung später wahrscheinlich auch. Noch mehr?</p>
//             </div>
//             <div className="leftColumn">
//                 <p>  </p>
//             </div>
//             <div className="centerColumn">
//                 {material.map((material) => {
//                     console.log(material);
//                     return(
//                         <div key={material.id}>
//                             <table >
//                                 <tbody>
//                                 <tr>
//                                     <td className="nameTd">
//                                         <table className="innerTable">
//                                             <tbody className="innerTBody">
//                                             <tr className="classificationTR">
//                                                 <td className="innerTD">
//                                                     Name
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td className="innerTD">
//                                                     {material.name}
//                                                 </td>
//                                             </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td className="authorTd">
//                                         <table>
//                                             <tbody>
//                                                 <tr className="classificationTR">
//                                                     <td className="innerTD">
//                                                         AutorIn
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className="innerTD">
//                                                         {material.author}
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td className="evaluationTd">
//                                         <table>
//                                             <tbody>
//                                                 <tr className="classificationTR">
//                                                     <td className="innerTD">
//                                                         Konzeptbewertung
//                                                     </td>
//                                                 </tr>
//                                                 <tr>
//                                                     {/*<ReactStars*/}
//                                                     {/*    count= {5} //{material.evaluationConcept}*/}
//                                                     {/*    onChange={ratingChangedEvaluationConcept}*/}
//                                                     {/*    size={24}*/}
//                                                     {/*    activeColor="#ffd700"*/}
//                                                     {/*/>*/}
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </td>
//                                     <td className="arrowTd">
//                                         <Link
//                                         to={`/materialDetails/${material.id}`}>
//                                             <FaArrowRight/>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     )
//                 })}
//             </div>
//             <div className="rightColumn">
//                 <p>  </p>
//             </div>
//             <div className="customFooter">
//                 <p>  </p>
//             </div>
//         </div>
//     );
// }
//
// const mapStateToProps = (state) => {
//     return {
//         material: state.material
//     }
// }
//
//
// export default ShowAllMaterial