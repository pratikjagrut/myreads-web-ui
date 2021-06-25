import { Link, Redirect } from "react-router-dom";

const Nav = (props: { auth: string | null, setAuth: (auth: string | null) => void }) => {
    const logout = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        localStorage.setItem("auth", "false")
        localStorage.clear()
        props.setAuth("false");
        <Redirect to="/" />
    }

    let menu;

    if (props.auth === "false" || props.auth === null) {
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
                        <Link to="" className="nav-link" onClick={logout}>Logout</Link>
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