import { isAuthenticated } from '../../Auth.js';
import './NavBar.css';

function NavBar(){

    return (
        <nav className="NavBar">
            <a className="Logo" href="/">SuiteStore</a>
            <ul className="NavBarLinks">
                {isAuthenticated() == true ?
                <>
                    <li className="NavBarLink"><a href='/products'>Products</a></li>
                    <li className="NavBarLink"><a href='/categories'>Categories</a></li>
                </>
                :null
            }
                {isAuthenticated() == true || isAuthenticated() == false ?
                    <>
                        <li className="NavBarLink"><a href='/history'>History</a></li>
                        <li className="NavBarLinkLogin"><button onClick={() => {sessionStorage.clear('user'); location.reload()}}>Logout</button></li>
                    </>
                    :
                    <li className="NavBarLinkLogin"><a href='/login'>Login</a></li>
                }
            </ul>
        </nav>
    )

}

export default NavBar;