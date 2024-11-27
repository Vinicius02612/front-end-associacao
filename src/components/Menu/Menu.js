import './Menu.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faHome, faPaste, faSearch} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    return(
       <nav className='Menu'>
            <div className='containMenu'>
                <ul className='ul'>
                    <li className='List_01'>
                        <a href="/">
                            <FontAwesomeIcon icon={faHome} /> Início
                        </a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUser} /> Sócio
                        <ul>
                            <li>
                                <a href="/socio/adicionar">
                                   Adicionar Sócio
                                </a>
                            </li>
                            <li>
                                <a href="/socio/buscar">
                                    <FontAwesomeIcon icon={faSearch} /> Buscar Sócios
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faPaste} />Projetos
                        <ul>
                            <li>
                                <a href="/projetos/adicionar">
                                    Adicionar Projetos
                                </a>
                            </li>
                            <li>
                                <a href="/projetos/buscar">
                                    <FontAwesomeIcon icon={faPaste} /> Buscar Projeto
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/mensalidade">
                            <FontAwesomeIcon icon={faPaste} />mensalidade
                        </a>
                    </li>
                </ul>
            </div>
       </nav>
    )
}