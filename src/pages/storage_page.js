// import React,{useState, useEffect} from "react";
// import {
//     collection,
// } from 'firebase/firestore';
// import { db} from "../services/firebase-config"
// import {uploadFilesWithDescription, GetFileList, getFileDescriptions} from "../services/firebase-crud";
//
// import '../styles/storagePage.css';
//
//
// function StoragePage() {
//
//     const [progress, setProgress] = useState(0);
//     const [downloadLinks, setDownloadLinks] = useState([]);
//     const [fileDescriptions, setFileDescriptions] = useState([]);
//     const [uploadFileDescription, setUploadFileDescription] = useState([]);
//
//     const fileInformationCollectionRef = collection(db, "fileInformation");
//
//     const handleUploadButton = (e) => {
//         e.preventDefault();
//         console.log("handleUploadButton: " + e.target[0].files);
//         const file = e.target[0].files[0];
//         uploadFilesWithDescription(file, uploadFileDescription);
//     }
//
//     useEffect(() => {
//
//         GetFileList().then((data) =>{
//             data.forEach((url) =>{
//                 setDownloadLinks(old => [...old, url]);
//             });
//         });
//
//         getFileDescriptions().then((data) =>{
//             console.log("getFileDescriptions.then: " + data)
//             setFileDescriptions(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
//         });
//
//     }, []);
//
//     return (
//         <div className="storagePageMain">
//             <div>
//                 <h1>Upload a new file</h1>
//                 <input
//                         placeholder="Name..."
//                         className="inputCustom"
//                         placeholder="Name..."
//                         onChange={(event) => {
//                         setUploadFileDescription(event.target.value);
//                     }}/>
//                 <form onSubmit={handleUploadButton}>
//                     <input type="file" className="input"  />
//                     <button type="submit"> Upload File</button>
//                 </form>
//                 <h3> Upload {progress} %</h3>
//             </div>
//             <div className="aboutBottom">
//                 <h1> Files already existing</h1>
//             </div>
//             {downloadLinks.map((link) => {
//
//                 // We use the last part of the download link given by firebase as our id. We retrieve this id here.
//                 // const link_id = link.substring(link.lastIndexOf("token=") + 6, link.length)
//                 //
//                 // // Then we search for this id in the descriptions we fetched
//                 // let correspondingDescription = fileDescriptions.find((element) => {
//                 //     return element.id === link_id
//                 // });
//                 // // If we cant find anything, we set the description to a default
//                 // if(correspondingDescription === undefined){
//                 //     correspondingDescription = "No description"
//                 // }
//
//                 let correspondingDescription = "no description"
//
//                 return (
//                     <div className='tableDiv'>
//                         <table className='customTable'>
//                             <tbody className='tableBody'>
//                                 <tr>
//                                     <td>
//                                         Description
//                                     </td>
//                                     <td>
//                                         Download-Link
//                                     </td>
//                                 </tr>
//                                 <tr>
//                                     <td className='leftColumn'>
//                                     {correspondingDescription.description}
//                                     </td>
//                                     <td className='rightColumn'>
//                                         <a href={link}>Download</a>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 )
//             })}
//         </div>
//     );
// }
//
// export default StoragePage;
