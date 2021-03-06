import { Wrapper } from "./Book.styles"
import { Button } from "react-bootstrap"
import MyModal from "../Components/Modal"
import { useState } from "react"

export type BookType  = {
    id: string,
    name: string,
    image: string,
    userid: string,
    status: string,
    author: string,
    description: string
}

const Book = (props: {book: BookType, showStatus: boolean}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    
    return (
        <Wrapper>
            <img src={`${process.env.REACT_APP_API_URL}/api/static/${props.book.image}`} className="img-thumbnail" alt={props.book.name} />
            <div>
                <h5><b><i>{props.book.name}</i></b></h5>
                <b><i>By: {props.book.author}</i></b>
                <br/>
                <i>{props.showStatus ? "Book in: " + props.book.status.toUpperCase():null}</i>
            </div>
            <MyModal show={show} setShow={setShow} book={props.book}/>
            <Button variant="success" onClick={handleShow}>More</Button>
        </Wrapper>
    )
}

export default Book