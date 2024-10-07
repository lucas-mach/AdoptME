import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>AdoptME</h1> {/* Logo or homepage link */}
                </Link>
                
                <nav>
                    <ul>
                        <li>
                            <Link to="/createAccount">Register</Link> {/* Register link */}
                            <Link to="/login">Login</Link> {/* Register link */}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
