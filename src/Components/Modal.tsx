import { SyntheticEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BookType } from '../Book/Book'
import UpdateForm from '../Components/UpdateForm'

const MyModal = (props: {show: boolean, book: BookType, setShow: (status: boolean) => void }) => {
    const [reload, setReload] = useState(false)
    
    const handleClose = () => {
        props.setShow(false);
        if (reload) {
            window.location.reload()
        }
    }

    const deleteBook = async (e: SyntheticEvent) => {
        e.preventDefault()

        const book = new FormData()
        book.append("id", props.book.id)
        book.append("image", props.book.image)
        if (window.confirm("Do you want to delete this book?")) {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/deletebook`, {
                method: 'POST',
                credentials: 'include',
                body: book
            });

            const content = await response.json();
            console.log(content)

            if (content.status !== 200) {
              window.alert(content.message)
            } else {
              window.alert(content.message)
              setReload(true)
            }
        }
    }

    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            scrollable={true}
        >
            <Modal.Header
                style={{
                    justifyContent: "center",
                }}
            >
                <Modal.Title>
                <h3><b>
                    <i>{props.book.name}</i>
                </b></h3>
                <i>by {props.book.author.toUpperCase()}</i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col">
                    <div className="row">
                        <div className="col-md-5">
                            <img src={`${process.env.REACT_APP_API_URL}/api/static/${props.book.image}`} className="img" alt={props.book.name} />
                        </div>
                        <div className="col-md-7">
                        <h3>About book</h3>
                        {/* <textarea rows={20} cols={45} defaultValue={props.book.description}/> */}
                        <p>{props.book.description}</p>      
                        <b style={{textTransform: 'capitalize'}}>Reading Status: <i>{props.book.status}</i></b>
                        </div>
                    </div>
                </div>
                <pre></pre>
            </Modal.Body>
            <Modal.Footer>
                <UpdateForm book={props.book} setReload={setReload}/>
                <Button variant="danger" onClick={deleteBook}>Delete Book</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default MyModal