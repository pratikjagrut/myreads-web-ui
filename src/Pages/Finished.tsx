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
      console.log(data)
      
   
    return (
        <div>
            <Grid container spacing={2}>
                {data?.map(book => (
                <Grid item key={book.id} xs={12} sm={2}>
                    <Book book={book}/>
                </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Finished