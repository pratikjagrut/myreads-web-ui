import {useEffect, useState} from 'react';
import './App.css';
import Nav from "./Components/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Pages/Home";
// User
import Register from "./User/Register";
import Login from "./User/Login";
import Reading from './Pages/Reading';
import Finished from './Pages/Finished';
import ReadList from './Pages/ReadList';
import AddBook from './Pages/Addbook'

function App() {
    const [name, setName] = useState('');
    // const [auth, setAuth] = useState(false)

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();
                setName(content.name)
            }
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName}/>

                <Route path="/" exact component={() => <Login setName={setName}/>}/>
                <Route path="/home" component={() => <Home />}/>
                <Route path="/register" component={Register}/>
                <Route path="/readlist" component={ReadList}/>
                <Route path="/finished" component={Finished}/>
                <Route path="/reading" component={Reading}/>
                <Route path="/addbook" component={AddBook}/>
            </BrowserRouter>
        </div>
    );
}

export default App;