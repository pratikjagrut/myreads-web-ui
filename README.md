# Myreads

Myreads is a web-based application that lets you manage your bookshelf digitally.
Here you can maintain the status of the books in three categories.

```
1. Wish List: Books which you want to read.
2. Reading List: Books you're currently reading.
3. Finished List: Books you finished reading.
```

# myreads-web-ui

This project is a UI for Myreads application.

This projects make requests to following APIs on API_URL you provide while building container image of this project.

```
1. /api/register: For user registration.
2. /api/login: For use login.
3. /api/user: To fetch the logged-in user information.
4. /api/logout: To log out the user.
5. /api/books/add: To add book the database.
6. /api/books/all: To fetch all the books.
7. /api/books/reading: To fetch books from the reading list.
8. /api/books/wishlist: To fetch books from wishlist.
9. /api/books/finished: To fetch books from the finished list.
10. /api/books/deletebook: To delete book
11. /api/books/updatestatus: To update the status of the books such as reading->finished.
12. /api/static: To fetch the static content such as the image.
```

## Start the server

To run the server, make sure you've docker installed.

### Clone the repo

```sh
git clone https://github.com/pratikjagrut/myreads-web-ui.git
```
### Build container image

```sh
docker build -t myreads-ui --build-arg API_URL=http://localhost:8000 .
```

### Run container

```sh
docker run -d -p 3000:80 myreads-ui
```

Hit the http://localhost:3000 in browser to access the application.

# Screenshots

![Home Page](screenshots/Screenshot%20from%202021-06-26%2002-52-18.png)
![Login Page](screenshots/Screenshot%20from%202021-06-26%2002-52-34.png)
![Register page](screenshots/Screenshot%20from%202021-06-26%2002-52-37.png)
![Add book page](screenshots/Screenshot%20from%202021-06-26%2002-52-30.png)