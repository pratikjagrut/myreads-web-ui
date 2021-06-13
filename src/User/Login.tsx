import { useState, SyntheticEvent } from "react"
import { Redirect } from "react-router"

const Login = (props: { setStatus: (status: number) => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        const content = await response.json()
        
        if (content.status !== 200) {
            setError((
                <div className="alert alert-danger" role="alert">
                    {content.message}
                </div>
            ))
        } else {
            setRedirect(true)
            props.setStatus(200)
            setError((
                <></>
            ))
        }
    }

    if (redirect) {
        return <Redirect to="/home"/>
    }

    return (
        <div className="form-signin">
            {error}
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="email" className="form-control" required 
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" required 
                    onChange={e => setPassword(e.target.value)}
                />
                <label>Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>    
    )
}

export default Login