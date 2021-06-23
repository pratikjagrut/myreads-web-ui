import { SyntheticEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BookType } from '../Book/Book'
import UpdateForm from '../Components/UpdateForm'

const MyModal = (props: {show: boolean, book: BookType, setShow: (status: boolean) => void }) => {
    const [reload, setReload] = useState(false)
    // const [error, setError] = useState(<></>)
    const bookId = props.book.id
    const bookName = props.book.name
    
    const handleClose = () => {
        props.setShow(false);
        if (reload) {
            window.location.reload()
        }
    }

    const deleteBook = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (window.confirm("Do you want to delete this book?")) {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/books/deletebook`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                  "id": bookId,
                  "name": bookName
                })
            });

            const content = await response.json();

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
            show={props.show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>
                    <i>{bookName}</i>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b><i>Book Status: {props.book.status.toUpperCase()}</i></b>
                <pre></pre>
                <UpdateForm bookId={bookId} setReload={setReload}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteBook}>Delete Book</Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
  
export default MyModal