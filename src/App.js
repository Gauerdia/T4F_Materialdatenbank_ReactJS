import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from './pages/home_page';
import CreateBNEMaterial from "./pages/create_bne_material_page";
import LogInPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import InternPage from "./pages/intern_page";
import PublicSearchPage from "./pages/public_search_page";
import PrivateSearchPage from "./pages/private_search_page";
import PublicDetailPage from "./pages/public_detail_page";
import PrivateDetailPage from "./pages/private_detail_page";
import ProfilePage from "./pages/profile_page";
import ApproveNewMembersPage from "./pages/approve_new_members_page";
import ApproveNewMaterialPage from "./pages/approve_new_material_page";
import React, {useState} from "react";

import './styles/App.css';

function App(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

  return (
      <div className="App">
        <Navbar {...props} handleLogout = {handleLogout} isLoggedIn={isLoggedIn}/>
        <Routes>
            <Route exact path="" element={<Home />}/>
          <Route exact path="/home" element={<Home />}/>

            {/*<Route exact path="/createMaterial"  element={<CreateBNEMaterial />}/>*/}

            <Route exact path="/publicSearch"  element={<PublicSearchPage/>}/>
            {/*<Route exact path="/privateSearch"  element={<PrivateSearchPage/>}/>*/}

            <Route exact path="/publicSearch/details/:id" element={<PublicDetailPage />}/>
            <Route exact path="/privateSearch/details/:id" element={<PrivateDetailPage />}/>

            <Route exact path="/login"  element={<LogInPage {...props} handleLogin = {handleLogin}/>}/>
            <Route exact path="/register"  element={<RegisterPage/>}/>

            <Route exact path="/intern" element={<InternPage {...props} handleLogin = {handleLogin}/>}/>
            {/*<Route exact path="/profile" element={<ProfilePage/>}/>*/}

            {/*<Route exact path="/approveNewMembers" element={<ApproveNewMembersPage/>}/>*/}
            {/*<Route exact path="/approveNewMaterial" element={<ApproveNewMaterialPage/>}/>*/}

        </Routes>
        <Footer />
      </div>
  );
}

export default App;
