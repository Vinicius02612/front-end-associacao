import React from "react";
import "./Cadastro.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/image_logo.png";
import culture from "../../assets/images/image_2.png";
import { Link } from "react-router-dom";



export default function Cadastro() {
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
                <h1>Olá, Seja Bem Vindo!</h1>
                <h3>Crie sua conta</h3>
                <form className="formulario">
                    <div className="form-group">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faUser} className="icon"/>
                            <input type="text" className="form-control" id="nome" aria-describedby="nameHelp" placeholder="Nome" />
                        </div>
                    </div>
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
                    <div className="form-group">
                        <div className="input-icon">
                            <FontAwesomeIcon icon={faLock}  className="icon" />
                            <input type="password" className="form-control" id="password" placeholder="Confirme sua senha"/>
                        </div>
                    </div>
                    <button type="submit" className="btn-cadastrar">Criar Conta</button>
                    <p>Voltar para <Link className="link" to="/">Login</Link></p>

                    
                </form>
            </div>
            
        </div>
    </div>
  );
}