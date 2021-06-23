import { useState, SyntheticEvent } from "react"
import { Redirect } from "react-router"

const Login = (props: { setAuth: (auth: string | null) => void }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        var user = new FormData()
        user.append("email", email)
        user.append("password", password)

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                body: user,
            })

            const content = await response.json()
            
            if (content.status !== 200) {
                localStorage.setItem("auth", "false")
                props.setAuth("false")
                setError((
                    <div className="alert alert-danger" role="alert">
                        {content.message}
                    </div>
                ))
            } else {
                setRedirect(true)
                localStorage.setItem("auth", "true")
                props.setAuth("true")
                setError((
                    <></>
                ))
            }
        }
        catch (error) {
            console.error(error)
            setError((
                <div className="alert alert-danger" role="alert">
                    Something went wrong, please try after some time.
                </div>
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
                    onChange={e => setEmail(e.target.value)} id="email"
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