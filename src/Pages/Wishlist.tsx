import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import Book, { BookType } from '../Book/Book'

const getBooks = async (): Promise<BookType[]> => 
    await (await fetch(`${process.env.REACT_APP_API_URL}/api/books/wishlist`, {
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
})).json()

const WishList = () => {
    
    const { isLoading, isFetching, isLoadingError, isError, data } = useQuery<BookType[] | undefined>(
        'books', 
        getBooks
    )

    let msg

    if (isLoading) {
        msg = (
            <div className="alert alert-warning text-center" role="alert">
                Wait, Loading ...
            </div>
        )
    }

    if (isLoadingError || isError) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                No books found! Please try adding book to this section or refresh this page.
            </div>
        )
    }

    let grid
    if (isFetching) {
        msg = (
            <div className="alert alert-warning text-center" role="alert">
                Wait, background refresh is in progress ....
            </div>
        )
    } else (
        grid = (
            <Grid container spacing={2}>
                {data?.map(book => (
                <Grid item key={book.id} xs={12} sm={2}>
                    <Book book={book} showStatus={false}/>
                </Grid>
                ))}
            </Grid>
        )
    )

    return (
        <>
            {msg}
            {grid}
        </>  
    )
}

export default WishList