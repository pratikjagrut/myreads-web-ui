import {Link} from "react-router-dom";

const Nav = (props: { status: number, setStatus: (status: number) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        props.setStatus(404);
    }

    let menu;

    if (props.status !== 200) {
        menu = (
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                </ul>
            </div>
        )
    } else {
        menu = (
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link to="/home" className="navbar-brand">MyReads</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/reading" className="nav-link" >Reading</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/wishlist" className="nav-link">Wishlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/finished" className="nav-link">Finished</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/addbook" className="nav-link">Add Book</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
               {menu}
            </div>
        </nav>

    );
};

export default Nav;