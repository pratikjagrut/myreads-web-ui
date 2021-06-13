import { useState, SyntheticEvent } from "react";
import { Redirect } from "react-router";

const AddBook = () => {
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    // const [image, setImage] = useState<FileList | null>()
    // const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/books/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                status,
                // image,
            })
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <form className="row g-3" onSubmit={submit}>
                        <div className="col-md-6">
                            <label className="form-label">Book Name</label>
                            <input type="text" className="form-control"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                        <label className="form-label">Reading status</label>
                        <select className="form-select" required 
                            onChange={e => setStatus(e.target.value)}>
                            <option value="reading">Reading</option>
                            <option value="finished">Finished</option>
                            <option value="readlist">Want to read</option>
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