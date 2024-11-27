import React from "react";
import "./Login.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/image_logo.png";
import culture from "../../assets/images/image_2.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container">
       
        <div className="containerMain">
            <div className="containerImage">
                <img className="cultureImage" src={culture} alt="Imagem de Login" />
            </div>
            <div className="containerFormulario" >
                <div className="containerImageLogo">
                    <img className="images" src={logo} alt="Logo" />
                </div>
                <h1>Olá, faça seu Login ou crie uma conta!  </h1>
                <form className="formulario">
                    <div className="form-group">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faLock}  className="icon" />
                            <input type="password" className="form-control" id="password" placeholder="Senha"/>
                        </div>
                    </div>
                    <button type="submit" className="btn-entrar">Login</button>
                    <button type="submit" className="btn-cadastrar2"><Link className="link" to="cadastro">Cadastre-se</Link></button>
                </form>
            </div>
            
        </div>
    </div>
  );
}