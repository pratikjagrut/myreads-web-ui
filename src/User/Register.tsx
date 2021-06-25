import { useState, SyntheticEvent } from "react";
import { Redirect } from "react-router";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        var user = new FormData()
        user.append("name", name)
        user.append("email", email)
        user.append("password", password)

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: 'POST',
            body: user,
        });

        const content = await response.json()
        
        if (content.status !== 200) {
            setError((
                <div className="alert alert-danger" role="alert">
                    {content.message}
                </div>
            ))
        } else {
            setRedirect(true)
            setError((
                <></>
            ))
        }
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="form-signin">
            {error}
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            <form onSubmit={submit}>
                <div className="form-floating">
                    <input type="text" className="form-control" required 
                        onChange={e => setName(e.target.value)} id="name"
                    />
                    <label>Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" required 
                        onChange={e => setEmail(e.target.value)} id="email"
                    />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" required 
                        onChange={e => setPassword(e.target.value)} id="password"
                    />
                    <label>Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register