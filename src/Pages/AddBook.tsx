import { useState, SyntheticEvent } from "react";
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('wishlist')
    const [image, setImage] = useState<FileList | null>()
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const book = new FormData()
        book.append("name", name)
        book.append("status", status)
        book.append("author", author)
        book.append("description", description)
        book.append("image", image![0])
        
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
                        <label className="form-label">Add to</label>
                        <select className="form-select" defaultValue="wishlist" required 
                            onChange={e => setStatus(e.target.value)}>
                            <option value="wishlist">Wish List</option>
                            <option value="reading">Reading List</option>
                            <option value="finished">Finished List</option>
                        </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Book Description</label>
                            <textarea rows={5} cols={50} className="form-control" required 
                            value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Choose an image for thumbnail</label>
                            <input type="file" className="form-control" required
                                onChange={e => setImage(e.target.files)}
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary float-end">Add Book</button>
                        </div>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default AddBook