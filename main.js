function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read) {
            return `${title} by ${author}, ${pages}, read`;
        } else {
            return `${title} by ${author}, ${pages}, not read yet`;
        }
    }
    this.isEqualTo = function (otherBook) {
        return this.name === otherBook.name;
    }
}

// test books
const onTheRoad = new Book("On the Road", "Jack Kerouac", 320, true);
const slouchingTowardBethlehem = new Book("Slouching Toward Bethlehem", "Joan Didion", 238, true);
const steppenwolf = new Book("Steppenwolf", "Hermann Hesse", 237, false);
const fearAndLoathing = new Book("Fear and Loathing in Las Vegas", "Hunter S. Thompson", 204, true);
const longValley = new Book("The Long Valley", "John Steinbeck", 272, true);
const orangesOf = new Book("Big Sur and the Oranges of Hieronymus Bosch", "Henry Miller", 404, false);
const eastOfEden = new Book("East of Eden", "John Steinbeck", 704, true);
let sampleBooksLibrary = [onTheRoad, slouchingTowardBethlehem, fearAndLoathing, steppenwolf, longValley, eastOfEden, orangesOf];

let myLibrary = [];
let displayedLibrary = [];

const bookshelf = document.querySelector('#bookshelf');

function addBookToLibrary() {
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.lastChild);
    }
    displayedLibrary.forEach(book => {
        let card = document.createElement('div');
        card.setAttribute('id', 'card');
        let title = document.createElement('p');
        title.setAttribute('id', 'book-title');
        let author = document.createElement('p');
        author.setAttribute('id', 'author-pages-read');
        let pages = document.createElement('p');
        pages.setAttribute('id', 'author-pages-read');
        let read = document.createElement('p');
        read.setAttribute('id', 'read');

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
            read.innerText = "Read";
            read.style = "color: green"
        } else {
            read.innerText = "Not read yet"
            read.style = "color: coral"
        }
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        bookshelf.appendChild(card);
    });
}


// toggle read/not read yet status
function updateReadStatus(card) {
    let readOrNotRead = card.lastChild.innerText;
    card.removeChild(card.lastChild);
    let readYet = document.createElement('p');
    readYet.setAttribute('id', 'read');
    if (readOrNotRead === 'Not read yet') {
        readYet.innerText = 'Read';
        readYet.style = "color: green; -webkit-user-select: none; -ms-user-select: none; user-select: none;";
        // update read status of book object
        let children = card.children;
        displayedLibrary.find(book => book.title === children.item(1).innerText).read = true;
        // myLibrary.find(book => book.title === children.item(1).innerText).read = true;
    } else {
        readYet.innerText = 'Not read yet';
        readYet.style = "color: coral; -webkit-user-select: none; -ms-user-select: none; user-select: none;"
        // update read status of book object
        let children = card.children;
        displayedLibrary.find(book => book.title === children.item(1).innerText).read = false;
        // myLibrary.find(book => book.title === children.item(1).innerText).read = false;
    }
    card.appendChild(readYet);
}
document.body.addEventListener('click', function (e) {
    if( e.target.id === 'read' && e.target.parentNode.id === 'card') {
        updateReadStatus(e.target.parentNode);
    };
});


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

// submit form
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
    addBookToLibrary();
    off();
}


// delete book button
document.body.addEventListener('click', function (e) {
    if( e.target.id === 'delete-button') {
        deleteBook(e);
    };
});
function deleteBook(e) {
    bookshelf.removeChild(e.target.parentNode);
    // remove book from myLibrary array
    const index = myLibrary.indexOf(e.target.parentNode);
    myLibrary.splice(index, 1);
}


let sampleBooksOn = false;
// add sample books
const sampleBooksButton = document.querySelector('#sample-books');
sampleBooksButton.addEventListener('click', addSampleBooks);
function addSampleBooks() {
    if (sampleBooksOn) { // turn off
        displayedLibrary = myLibrary.slice(); // copy of myLibrary rather than reference to object!
        addBookToLibrary();
        sampleBooksOn = false;
        sampleBooksButton.style = "background-color: white; border: 2px solid cadetblue; color: cadetblue;";
    } else { // turn on
        displayedLibrary = myLibrary.concat(sampleBooksLibrary);
        addBookToLibrary();
        sampleBooksOn = true;
        sampleBooksButton.style = "background-color: cadetblue; color: white;";
    }
}




// validate input: pages must be a number
