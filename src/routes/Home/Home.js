import React from "react";
import "./Home.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/image_logo.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu"; 

export default function Home() {

    return(
        <nav>
            <Header/>
            <Menu/>
        </nav>
       
    )
}