function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// test books
const onTheRoad = new Book("On the Road", "Jack Kerouac", 320, true);
const slouchingTowardsBethlehem = new Book("Slouching Towards Bethlehem", "Joan Didion", 238, true);
const steppenwolf = new Book("Steppenwolf", "Hermann Hesse", 237, false);
const fearAndLoathing = new Book("Fear and Loathing in Las Vegas", "Hunter S. Thompson", 204, true);
const longValley = new Book("The Long Valley", "John Steinbeck", 272, true);
const orangesOf = new Book("Big Sur and the Oranges of Hieronymus Bosch", "Henry Miller", 404, false);
const eastOfEden = new Book("East of Eden", "John Steinbeck", 704, true);
let sampleBooksLibrary = [onTheRoad, slouchingTowardsBethlehem, eastOfEden, fearAndLoathing, longValley, steppenwolf, orangesOf];


let myLibrary = []; // only books added by user via form (excludes sample books)
let displayedLibrary = []; // all books on bookshelf (including sample books)
let displayedCards = []; // cards on the bookshelf
let myCards = [];


function createCard(book) { // create and return card from book object
    let card = document.createElement('div');
    card.setAttribute('id', 'card');
    let title = document.createElement('p');
    title.setAttribute('id', 'book-title');
    let author = document.createElement('p');
    author.setAttribute('id', 'author-pages-read');
    let pages = document.createElement('p');
    pages.setAttribute('id', 'author-pages-read');
    let readYet = document.createElement('p');
    readYet.setAttribute('id', 'read-yet-words');

    // delete button
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'delete-button');
    deleteButton.innerText = "x";
    card.appendChild(deleteButton);

    title.innerText = book.title;
    author.innerText = book.author;
    if (parseInt(book.pages) == 1) {
        pages.innerText = book.pages + " page";
    } else if (parseInt(book.pages) > 1) {
        pages.innerText = book.pages + " pages";
    }
    if (book.read) {
        readYet.innerText = "Read";
        readYet.style = "color: green; margin: 0 0;"
    } else {
        readYet.innerText = "Not read yet"
        readYet.style = "color: coral; margin: 0 0;"
    }
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readYet);

    return card;
}


function clearBookshelf() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
    }
    displayedCards = [];
}


const bookshelf = document.querySelector('#bookshelf');

function addBookToBookshelf(book) { // for all books
    let card = createCard(book);
    bookshelf.appendChild(card);
    displayedCards.push(card);
}


// add sample books to displayed library then add displayed library books to bookshelf
let sampleBooksOn = false;
const sampleBooksButton = document.querySelector('#sample-books');
sampleBooksButton.addEventListener('click', addSampleBooks);
function addSampleBooks() {
    if (sampleBooksOn) { // turn off
        displayedLibrary = myLibrary.slice(); // copy of myLibrary rather than reference to object!
        clearBookshelf();
        displayedLibrary.forEach(book => {
            addBookToBookshelf(book);
        })
        sampleBooksOn = false;
        sampleBooksButton.style = "background-color: white; border: 2px solid cadetblue; color: cadetblue;";
    } else { // turn on
        displayedLibrary = myLibrary.concat(sampleBooksLibrary);
        clearBookshelf();
        displayedLibrary.forEach(book => {
            addBookToBookshelf(book);
        })
        sampleBooksOn = true;
        sampleBooksButton.style = "background-color: cadetblue; color: white;";
    }
}


// + NEW BOOK button
const newBookButton = document.querySelector('#new-book');
newBookButton.addEventListener('click', on);

const xButton = document.querySelector('#X');
xButton.addEventListener('click', off);

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    form.reset();
    document.getElementById("overlay").style.display = "none";
}

function submitForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let title = data.get('title');
    let author = data.get('author');
    let pages = data.get('pages');
    let read = data.get('read');
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayedLibrary.push(newBook);
    clearBookshelf();
    displayedLibrary.forEach(book => {
        addBookToBookshelf(book);
    })
    if (!sampleBooksLibrary.includes(newBook)) { // must be new book added by user
        myCards.push(createCard(newBook));
    }
    off();
}


// delete book button
document.body.addEventListener('click', function (e) {
    if( e.target.id === 'delete-button') {
        deleteBook(e);
    };
});
function deleteBook(e) {
    let card = e.target.parentNode;
    bookshelf.removeChild(card);
    displayedCards.splice(displayedCards.indexOf(card), 1); // remove card from displayedCards
    displayedLibrary = createNewLibrary(displayedCards); // update displayed library
    if (myCards.includes(card)) {
        myCards.splice(myCards.indexOf(card), 1);
        myLibrary = createNewLibrary(myCards);
    }
}

function createNewLibrary(cards) { // for each card, add book
    let library = [];
    cards.forEach(card => {
        let newBook = createBook(card);
        library.push(newBook);
    })
    return library;
}

function createBook(card) {
    let title = card.children[1].innerText;
    let author = card.children[2].innerText;
    let pages = card.children[3].innerText;
    let read = '';
    if (card.children[4].innerText === 'Read') {
        read = true;
    } else {
        read = false;
    }
    
    return new Book(title, author, parseInt(pages), read);
}

// toggle read/not read yet status
function updateReadStatus(card) {
    let readOrNotRead = card.lastChild.innerText;
    card.removeChild(card.lastChild);
    let readYet = document.createElement('p');
    readYet.setAttribute('id', 'read-yet-words');
    if (readOrNotRead === 'Not read yet') {
        readYet.innerText = 'Read';
        readYet.style = "color: green; -webkit-user-select: none; -ms-user-select: none; user-select: none;";
    } else {
        readYet.innerText = 'Not read yet';
        readYet.style = "color: coral; -webkit-user-select: none; -ms-user-select: none; user-select: none;"
    }
    card.appendChild(readYet);
    updateBookReadStatus(card.children[1].innerText);
}
document.body.addEventListener('click', function (e) {
    if( e.target.id === 'read-yet-words' && e.target.parentNode.id === 'card') {
        updateReadStatus(e.target.parentNode);
    };
});

function updateBookReadStatus(title) {
    let oldReadStatus = displayedLibrary.find(book => book.title === title).read;
    if (oldReadStatus) {
        displayedLibrary.find(book => book.title === title).read = false;
    } else {
        displayedLibrary.find(book => book.title === title).read = true;
    }
    if (sampleBooksLibrary.find(book => book.title === title) === undefined) { // if user added book
        if (oldReadStatus) {
            myLibrary.find(book => book.title === title).read = false;
        } else {
            myLibrary.find(book => book.title === title).read = true;
        }
    }
}