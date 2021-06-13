import { Wrapper } from "./Book.styles"
import Button from "@material-ui/core/Button";

export type BookType  = {
    id: string,
    name: string,
    image: string,
    userid: string,
    status: string
}

const Book = (props: {book: BookType}) => (
    <Wrapper>
        {/* <img src="sj.jpg" className="img-thumbnail" alt={props.book.name} /> */}
        <div>
            <h4>Title: {props.book.name}</h4>
            <p>Status: {props.book.status}</p>
        </div>
        <Button variant="contained" color="primary" id={props.book.name}>Update Status</Button>
    </Wrapper>
)

export default Book