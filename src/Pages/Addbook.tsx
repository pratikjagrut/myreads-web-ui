import { useState, SyntheticEvent } from "react";
const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('reading')
    // const [image, setImage] = useState<FileList | null>()
    const [error, setError] = useState(<></>)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/books/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                "name": name,
                "author": author,
                "status": status,
                //"image": image,
                
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
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    {error}
                    <form className="row g-3" onSubmit={submit}>
                        <div className="col-md-6">
                            <label className="form-label">Book Name</label>
                            <input type="text" className="form-control" required
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Author</label>
                            <input type="text" className="form-control" required
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
                        {/* <div className="col-12">
                            <label className="form-label">Choose an image for thumbnail</label>
                            <input type="file" className="form-control"
                                onChange={e => setImage(e.target.files)}
                            />
                        </div> */}
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