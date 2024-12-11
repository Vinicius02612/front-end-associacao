import './Menu.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faHome, faPaste, faSearch, faLongArrowAltUp, faArrowRightFromBracket, faCalendar, faCalendarWeek, faSearchPlus, faDollar, faFileArchive, faDollarSign, faPlus, faUserAlt, faAdd, faCalendarAlt, faTimeline, faTimes} from '@fortawesome/free-solid-svg-icons';
import { faAd } from '@fortawesome/free-solid-svg-icons/faAd';
import { faSubtract } from '@fortawesome/free-solid-svg-icons/faSubtract';

export default function Header() {
    return(
       <nav className='Menu'>
            <div class="sidebar">
                <div class="menu-item">
                    <a  href="#"><FontAwesomeIcon className='icons' icon={faHome} />Início</a>
                </div>
                <div class="menu-item">
                <a href="#"><FontAwesomeIcon className='icons'  icon={faUserAlt} />Sócio</a>
                    <div class="submenu">
                        <a href="#"> <FontAwesomeIcon className='icons'  icon={faPlus} />Adicionar</a>
                        <a href="#"><FontAwesomeIcon className='icons'  icon={faSearch} />Buscar</a>
                    </div>
                </div>
                <div class="menu-item">
                <a href="#"><FontAwesomeIcon className='icons'  icon={faPaste} />Projetos</a>
                    <div class="submenu">
                        <a href="#"> <FontAwesomeIcon className='icons'  icon={faPlus} />Adicionar</a>
                        <a href="#"><FontAwesomeIcon className='icons'  icon={faSearch} />Buscar</a>
                    </div>
                </div>
                <div class="menu-item">
                    <a href="#"> <FontAwesomeIcon  className='icons'  icon={faCalendarAlt} /> Mensalidades</a>
                    <div class="submenu">
                        <a href="#"> <FontAwesomeIcon className='icons'  icon={faCalendarAlt} />Acompanhar</a>
                    </div>
                </div>
                <div class="menu-item">
                    <a href="#"> <FontAwesomeIcon  className='icons'  icon={faFileArchive} /> Relatorios</a>
                    <div class="submenu">
                        <a href="#"> <FontAwesomeIcon className='icons'  icon={faSubtract} />Despesas</a>
                        <a href="#"> <FontAwesomeIcon className='icons'  icon={faAdd} />Receitas</a>
                    </div>
                </div>
                <a href="#" class="menu-item"><FontAwesomeIcon className='icons'  icon={faArrowRightFromBracket} />Sair</a>
            </div>
       </nav>
    )
}