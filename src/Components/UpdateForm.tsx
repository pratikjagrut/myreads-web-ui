import { useState, SyntheticEvent } from "react";

const UpdateForm = (props: {bookId: string, setReload: (reload: boolean) => void}) => {
    const [bookStatus, setBookStatus] = useState('reading')
    const [error, setError] = useState(<></>)
    const bookId = props.bookId

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (window.confirm(`Do you want to move this book to ${bookStatus}?`)) {
            const response = await fetch('http://localhost:8000/api/books/updatestatus', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    "status": bookStatus,
                    "id": bookId
                })
            });

            const content = await response.json();
            console.log(bookStatus)

            if (content.status !== 200) {
                setError((
                    <div className="alert alert-danger" role="alert">
                        {content.message}
                    </div>
                ))
                props.setReload(true)
            } else {
                setError((
                    <div className="alert alert-success" role="alert">
                        {content.message}
                    </div>
                ))
            }
        }
    }

    return (
        <div className="row">
            <div className="col">
                {error}
                <form className="row g-3" onSubmit={submit}>
                    <div className="col-md-6">
                    <select className="form-select" defaultValue="reading" required
                        onChange={e => setBookStatus(e.target.value)}
                    >
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