import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import Book, { BookType } from '../Book/Book'

const getBooks = async (): Promise<BookType[]> => 
    await (await fetch('http://localhost:8000/api/books/reading', {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    })).json()

const Reading = () => {

    const { data } = useQuery<BookType[]>(
            'books', 
            getBooks
    )
    console.log(data)
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
                <Grid item key={book.id} xs={12} sm={2}>
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

export default Reading