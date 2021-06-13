import { Wrapper } from "./Book.styles"
// import Button from "@material-ui/core/Button";
import { Button } from "react-bootstrap"
import MyModal from "../Components/Modal"
import { useState } from "react"

export type BookType  = {
    id: string,
    name: string,
    image: string,
    userid: string,
    status: string,
    author: string
}

const Book = (props: {book: BookType}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    
    return (
        <Wrapper>
            {/* <img src="sj.jpg" className="img-thumbnail" alt={props.book.name} /> */}
            <div>
                <h5><b><i>{props.book.name}</i></b></h5>
                <b><i>By: {props.book.author}</i></b>
                <p>Status: {props.book.status}</p>
            </div>
            <MyModal show={show} setShow={setShow} book={props.book}/>
            <Button variant="success" onClick={handleShow}>More</Button>
        </Wrapper>
    )
}

export default Book