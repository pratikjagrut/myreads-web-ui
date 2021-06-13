import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import Book, { BookType } from '../Book/Book'

const getBooks = async (): Promise<BookType[]> => 
    await (await fetch('http://localhost:8000/api/books/finished', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })).json()

const Finished = () => {

    const { data } = useQuery<BookType[]>(
            'books', 
            getBooks
    )
    
    let page
    
     if (data?.map === undefined) {
        page = (
            <h3 style={{color: "red", textAlign: "center"}}>
                Empty bookshelf
            </h3>
        )
    } else {
        page = (
            <Grid container spacing={2}>
                {data?.map(book => (
                <Grid item key={book.id} xs={6} sm={2}>
                    <Book book={book}/>
                </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <div>
            {page}
        </div>
    )
}

export default Finished