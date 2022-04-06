import React, {useEffect, useState} from "react";
import Logo from "../assets/images/pizzaLogo.png";
import T4FLogo from "../assets/images/t4f_logo.png";
import {Link, useNavigate} from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";

function Navbar(props) {

  const [openLinks, setOpenLinks] = useState(false);

  let navigate = useNavigate();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };


  const handleLogOut = () => {
    props.handleLogout()
    sessionStorage.clear();
    navigate("/")
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('t4f_auth_token')
    console.log("Navbar:", props.isLoggedIn)
    if(authToken){
    }
  },[]);

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <Link to="/">
          <img src={T4FLogo} />
        </Link>
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </div>

      <div className="rightSide">
        <Link to="/">Start</Link>
        <Link to="/publicSearch">Suche</Link>
          {props.isLoggedIn ? (
            <div>
              <Link to="/intern">Intern</Link>
              <a href="" onClick={handleLogOut}>Log Out</a>
            </div>
          ):(
              <div>
                <Link to="/register">Registrieren</Link>
                <Link to="/login">Log In</Link>
              </div>
          )
        }
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
