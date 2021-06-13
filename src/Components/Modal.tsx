import { SyntheticEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BookType } from '../Book/Book'
import UpdateForm from '../Components/UpdateForm'

const MyModal = (props: {show: boolean, book: BookType, setShow: (status: boolean) => void }) => {
    const handleClose = () => props.setShow(false);
    const [error, setError] = useState(<></>)
    const bookId = props.book.id
    const bookName = props.book.name

    const deleteBook = async (e: SyntheticEvent) => {
      e.preventDefault()

      const response = await fetch('http://localhost:8000/api/books/deletebook', {
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
            setError((
                <div className="alert alert-danger" role="alert">
                    {content.message}
                </div>
            ))
        } else {
            setError((
                <div className="alert alert-warning" role="alert">
                    {content.message}
                </div>
            ))
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
          {error}
            <b><i>Book Status: {props.book.status.toUpperCase()}</i></b>
            <pre></pre>
            <UpdateForm bookId={bookId}/>
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