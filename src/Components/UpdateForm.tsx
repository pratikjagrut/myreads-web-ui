import { useState, SyntheticEvent } from "react";

const UpdateForm = () => {
    const [bookStatus, setBookStatus] = useState('reading')
    const [error, setError] = useState(<div></div>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/books/updatestatus', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                bookStatus                
            })
        });

        const content = await response.json();
        console.log(content)

        if (content.status !== 200) {
            setError((
                <div className="alert alert-danger" role="alert">
                    {content.message}
                </div>
            ))
        } else {
            setError((
                <div className="alert alert-success" role="alert">
                    {content.message}
                </div>
            ))
        }
    }


    return (
        <div className="row">
            <div className="col">
            <form className="row g-3" onSubmit={submit}>
                    <div className="col-md-6">
                    <select className="form-select" defaultValue="reading" required>
                        <option value="reading">Reading</option>
                        <option value="finished">Finished</option>
                        <option value="wishlist">Wishlist</option>
                    </select>
                    </div>
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateForm