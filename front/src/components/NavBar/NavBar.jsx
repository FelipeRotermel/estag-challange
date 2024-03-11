import './NavBar.css'

function NavBar(){

    return (
        <nav className="NavBar">
            <a className="Logo" href="/">Suite Store</a>
            <ul className="NavBarLinks">
                <li className="NavBarLink"><a href='/products'>Products</a></li>
                <li className="NavBarLink"><a href='/categories'>Categories</a></li>
                <li className="NavBarLink"><a href='/history'>History</a></li>
            </ul>
        </nav>
    )

}

export default NavBar;