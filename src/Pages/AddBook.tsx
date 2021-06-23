import { useState, SyntheticEvent } from "react";
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('reading')
    const [image, setImage] = useState<FileList | null>()
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const book = new FormData()
        book.append("name", name)
        book.append("status", status)
        book.append("author", author)
        book.append("image", image![0])
        console.log(book)
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/books/add`, {
                method: 'POST',
                credentials: 'include',
                body: book,
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
                setName('')
                setAuthor('')
            }
        }
        catch (error) {
            console.error(error)
            setError((
                <div className="alert alert-success" role="alert">
                    Something went wrong, please try after some time.
                </div>
            ))
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    {error}
                    <form className="row g-3" onSubmit={submit}>
                        <div className="col-md-6">
                            <label className="form-label">Book Name</label>
                            <input type="text" className="form-control" required value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Author</label>
                            <input type="text" className="form-control" required value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                        <label className="form-label">Reading status</label>
                        <select className="form-select" defaultValue="reading" required 
                            onChange={e => setStatus(e.target.value)}>
                            <option value="reading">Reading</option>
                            <option value="finished">Finished</option>
                            <option value="wishlist">Wishlist</option>
                        </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Choose an image for thumbnail</label>
                            <input type="file" className="form-control" required
                                onChange={e => setImage(e.target.files)}
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Add Book</button>
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default AddBook