// import React,{useState, useEffect} from "react";
// import { db} from "../services/firebase-config"
// import {
//     collection,
//     getDocs,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     doc,
//     query,
// } from 'firebase/firestore';
//
// import "../styles/docPage.css";
//
// function DocPage() {
//
//     const [users, setUsers] = useState([]);
//     const [newName, setNewName] = useState("");
//     const [newAge, setNewAge] = useState(0);
//     const usersCollectionRef = collection(db, "users");
//
//
//       // Firebase-CRUD-Operations
//     const createUser = async () => {
//         await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
//     };
//
//     const updateUser = async (id, age) => {
//         const userDoc = doc(db, "users", id);
//         const newFields = { age: age + 1 };
//         await updateDoc(userDoc, newFields);
//     };
//
//     const deleteUser = async (id) => {
//         const userDoc = doc(db, "users", id);
//         await deleteDoc(userDoc);
//     };
//
//   // Fetches Firestore data to display it
//     useEffect(() => {
//         console.log("useEffect in Home")
//         const getUsers = async () => {
//         const data = await getDocs(query(collection(db, "users")));
//         setUsers(
//             data.docs.map(
//                 (doc) =>
//                 (
//                     {...doc.data(), id: doc.id}
//                 )
//             )
//         );
//     };
//
//     getUsers();
//         console.log("useEffect in Home, users: " + users);
//     }, []);
//
//
//     return (
//         <div className="App">
//             <div className="aboutBottom">
//                 <h1> Document-CRUD</h1>
//             </div>
//             <div className="docPageContent">
//                 <div>
//                     <h3>Create a new user</h3>
//                 </div>
//                 <div>
//                     <input
//                         placeholder="Name..."
//                         className="inputCustom"
//                         placeholder="Name..."
//                         onChange={(event) => {
//                         setNewName(event.target.value);
//                     }}/>
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         className="inputCustom"
//                         placeholder="Age..."
//                         onChange={(event) => {
//                             setNewAge(event.target.value);
//                         }}/>
//                 </div>
//                 <button
//                     onClick={createUser}
//                     className="button1"
//                 >Create User</button>
//                 <div>
//                     <h3>Users that already exist</h3>
//                 </div>
//
//                 {users.map((user) => {
//                     console.log(user);
//                     return(
//                         <div key={user.id}>
//                             <table className="customTable">
//                                 <tbody>
//                                     <tr>
//                                         <td className="firstColumn">
//                                             <h4>Name: {user.name}</h4>
//                                         </td>
//                                         <td>
//                                             <button onClick={() => {deleteUser(user.id);}}>
//                                                 {" "} Delete User
//                                             </button>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td>
//                                         <h4>Age: {user.age}</h4>
//                                         </td>
//                                         <td>
//                                             <button onClick={ () => {updateUser(user.id, user.age);}}>
//                                                 {" "} Increase Age
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     );
// }
//
// export default DocPage;