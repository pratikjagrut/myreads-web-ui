import {useEffect, useState} from 'react';
import './App.css';
import Nav from "./Components/NavBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home";
// User
import Register from "./User/Register";
import Login from "./User/Login";
import Reading from './Pages/Reading';
import Finished from './Pages/Finished';
import Wishlist from './Pages/Wishlist';
import AddBook from './Pages/AddBook';

function App() {
    const [status, setStatus] = useState(404);
    const [auth, setAuth] = useState<string | null>("false")
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                    })

                    const content = await response.json()
                    setStatus(content.status)
                    if (status === 200) {
                        localStorage.setItem("auth", "true")
                    } else {
                        localStorage.setItem("auth", "false")
                    }
                }
                catch (error){
                    console.log(error)
                }
            }
        )();
        setAuth(localStorage.getItem("auth"))
    }, [status]);

    let routes;
    
    if (localStorage.getItem("auth") !== "true") {
        routes = (
            <Switch>
                <Route exact path="/" component={() => <Login setAuth={setAuth}/>}/>
                <Route exact path="/register" component={Register}/>
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route exact path="/wishlist" component={Wishlist}/>
                <Route exact path="/finished" component={Finished}/>
                <Route exact path="/reading" component={Reading}/>
                <Route exact path="/addbook" component={AddBook}/>
                <Route exact path="/home" component={Home}/>
            </Switch>
        )
    }
    return (
        <div className="App">
            <BrowserRouter>
                <Nav auth={auth} setAuth={setAuth}/>
                {routes}
            </BrowserRouter>
        </div>
    );
}

export default App;