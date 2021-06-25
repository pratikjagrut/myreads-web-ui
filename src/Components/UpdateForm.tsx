import { useState, SyntheticEvent } from "react";
import { BookType } from "../Book/Book";

const UpdateForm = (props: {book: BookType, setReload: (reload: boolean) => void}) => {
    const [bookStatus, setBookStatus] = useState('wishlist')

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const book = new FormData()
        book.append("id", props.book.id)
        book.append("status", bookStatus)
        if (window.confirm(`Do you want to move this book to ${bookStatus}?`)) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/updatestatus`, {
                method: 'POST',
                credentials: 'include',
                body: book
            });

            const content = await response.json();

            if (content.status !== 200) {
                window.alert(content.message)
            } else {
                window.alert(content.message)
                props.setReload(true)
            }
        }
    }

    return (
        <div className="col">
            <form className="row g-3" onSubmit={submit}>
                <div className="col-md-6">
                <select className="form-select" defaultValue={props.book.status} required
                    onChange={e => setBookStatus(e.target.value)}
                >   
                    <option value="wishlist">Wishlist</option>
                    <option value="reading">Reading</option>
                    <option value="finished">Finished</option>
                </select>
                </div>
                <div className="col-md-6">
                    <button type="submit" className="btn btn-primary">Update Status</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateForm