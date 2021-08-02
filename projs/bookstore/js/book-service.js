'use strict';
const KEY = 'bookDB';
const PAGE_SIZE = 3;
var gBooks;
var gCurrReadBook = null;
var gSortBy = 'name';
var gPageIdx = 0;
var gCurrUpdateBook = null;

_createBooks();

function getCurrPageIdx() {
    return gPageIdx;
}

function nextPage() {
    if (gPageIdx >= getNumOfPages() - 1) return;
    gPageIdx++;
}

function prevPage() {
    if (gPageIdx <= 0) return;
    gPageIdx--;
}

function setPage(pageIdx) {
    gPageIdx = pageIdx;
}

function getNumOfPages() {
    return Math.ceil(gBooks.length / PAGE_SIZE);
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}

function decreaseRate() {
    if (gCurrReadBook.rate > 0) gCurrReadBook.rate--;
    _saveBooksToStroage();
}

function increaseRate() {
    if (gCurrReadBook.rate < 10) gCurrReadBook.rate++;
    _saveBooksToStroage();
}

function getCurrUpdateBook() {
    return gCurrUpdateBook;
}

function setCurrUpdateBook(bookId) {
    gCurrUpdateBook = gBooks.find(function (book) {
        return book.id === bookId
    });
}

function updateBook(price) {
    if (!price || isNaN(price)) return false;
    gCurrUpdateBook.price = price;
    _saveBooksToStroage();
    return true;
}

function getCurrReadBook() {
    return gCurrReadBook;
}

function setCurrReadBook(bookId) {
    gCurrReadBook = gBooks.find(function (book) {
        return book.id === bookId
    })
}

function setBookRate(bookId, rate) {
    var currBook = gBooks.find(function (book) {
        return book.id === bookId;
    })
    currBook.rate = rate;
    _saveBooksToStroage();
}


function addBook(name, price) {
    if (!name || !price) return false;
    if (isNaN(price)) return false;
    var newBook = _createBook(name, price);
    gBooks.unshift(newBook);
    _saveBooksToStroage();
    return true;
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    var currPages = getNumOfPages();
    gBooks.splice(bookIdx, 1);
    var newPages = getNumOfPages();
    if (currPages !== newPages && gPageIdx === currPages-1) {
        gPageIdx--;
    }
    _saveBooksToStroage();
}

function getBooksToDisplay() {
    var sortFunc;
    if (gSortBy === 'name') {
        sortFunc = function (book1, book2) {
            return book1.name.localeCompare(book2.name);
        }
    } else {
        sortFunc = function (book1, book2) {
            return book1.price - book2.price;
        }
    }
    var sortedBooks = gBooks.sort(sortFunc);
    var startIdx = gPageIdx * PAGE_SIZE;
    return sortedBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    });
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [
            _createBook('A clock work orange', 15, 'img/aclockworkorange-cover.jpg'),
            _createBook('Jaws', 45, 'img/jaws-cover.jpg'),
            _createBook('The catcher in the rye', 30, 'img/thecatcherintherye-cover.jpg'),
            _createBook('To kill a mocking bird', 50, 'img/tokillamockingbird-cover.jpg')
        ]
    }
    gBooks = books;
    _saveBooksToStroage();
}

function _createBook(name, price, imgUrl = 'img/no-cover.png', rate = 0) {
    return {
        id: makeId(),
        name,
        price,
        rate,
        imgUrl,
        description: makeLorem(),
    }
}

function _saveBooksToStroage() {
    saveToStorage(KEY, gBooks);
}

