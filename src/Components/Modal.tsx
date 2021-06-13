import { Modal, Button } from "react-bootstrap";
import { BookType } from '../Book/Book'
import UpdateForm from '../Components/UpdateForm'

const MyModal = (props: {show: boolean, book: BookType, setShow: (status: boolean) => void }) => {
    const handleClose = () => props.setShow(false);
    return (
        <Modal
          show={props.show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>
                <i>{props.book.name}</i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b><i>Book Status: {props.book.status.toUpperCase()}</i></b>
            <pre></pre>
            <UpdateForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
}
  
export default MyModal