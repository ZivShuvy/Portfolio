'use strict';

function onInit() {
    renderBooks();
    renderPageBtns(0, 0);
}

//Moving pages

function onNextPage() {
    var prevPageIdx = getCurrPageIdx();
    nextPage();
    var newPageIdx = getCurrPageIdx();

    renderPageBtns(prevPageIdx, newPageIdx);
    renderBooks();
}

function onPrevPage() {
    var prevPageIdx = getCurrPageIdx();
    prevPage();
    var newPageIdx = getCurrPageIdx();

    renderPageBtns(prevPageIdx, newPageIdx);
    renderBooks();
}

function onSetPage(pageIdx) {
    var prevPageIdx = getCurrPageIdx();
    setPage(pageIdx);
    var newPageIdx = getCurrPageIdx();

    renderPageBtns(prevPageIdx, newPageIdx);
    renderBooks();
}

//Sort the books

function onSortByPrice() {
    setSortBy('price');
    var elNameSortImg = document.querySelector('.name-sort img');
    elNameSortImg.src = 'img/filter-off.png';
    var elPriceSortImg = document.querySelector('.price-sort img');
    elPriceSortImg.src = 'img/filter-on.png';
    renderBooks();
}

function onSortByName() {
    setSortBy('name');
    var elNameSortImg = document.querySelector('.name-sort img');
    elNameSortImg.src = 'img/filter-on.png';
    var elPriceSortImg = document.querySelector('.price-sort img');
    elPriceSortImg.src = 'img/filter-off.png';
    renderBooks();
}

//Update book's rate

function onDecreaseRate() {
    decreaseRate();
    renderBooks();
    var currReadBook = getCurrReadBook();
    var elReadModal = document.querySelector('.read-modal');
    elReadModal.querySelector('.rate span').innerText = currReadBook.rate;
}

function onIncreaseRate() {
    increaseRate();
    renderBooks();
    var currReadBook = getCurrReadBook();
    var elReadModal = document.querySelector('.read-modal');
    elReadModal.querySelector('.rate span').innerText = currReadBook.rate;
}

//Read mode

function onCloseReadModal() {
    var elReadModal = document.querySelector('.read-modal');
    elReadModal.hidden = true;
}

function onReadBook(bookId) {
    var currBook = getBookById(bookId);
    var elReadModal = document.querySelector('.read-modal');
    elReadModal.querySelector('h1').innerText = currBook.name;
    elReadModal.querySelector('img').src = currBook.imgUrl;
    elReadModal.querySelector('h2').innerText = currBook.price + '$';
    elReadModal.querySelector('p').innerText = currBook.description;
    elReadModal.querySelector('span').innerText = currBook.rate;
    elReadModal.hidden = false;
    setCurrReadBook(bookId);
}

//Update book price

function onSaveUpdate() {
    var updatedBookPrice = document.querySelector('[name=updateBookPrice]').value;
    var isUpdated = updateBook(updatedBookPrice);
    if (isUpdated) {
        renderBooks();
        onCloseUpdateBookModal();
    } else {
        document.querySelector('.update-book-modal span').innerText = 'Invalid price, please try again.'
    }
    document.querySelector('[name=updateBookPrice]').value = '';
}

function onCloseUpdateBookModal() {
    document.querySelector('.update-book-modal').hidden = true;
}

function onUpdateBook(bookId) {
    document.querySelector('.update-book-modal').hidden = false;
    setCurrUpdateBook(bookId);
}

//Add book

function closeAddBook() {
    document.querySelector('.add-book').hidden = true;
}

function onCreateBook() {
    document.querySelector('.add-book').hidden = false;
}

function onAddBook() {
    var bookName = document.querySelector('[name=newBookName]').value;
    var bookPrice = document.querySelector('[name=newBookPrice]').value;
    var isAdded = addBook(bookName, bookPrice);
    if (isAdded) {
        document.querySelector('.add-book span').innerText = ''
        renderBooks();
        renderPageBtns(getCurrPageIdx(), getCurrPageIdx());
        closeAddBook();
    } else {
        document.querySelector('.add-book span').innerText = 'Invalid details, please try again.'
    }
    document.querySelector('[name=newBookName]').value = '';
    document.querySelector('[name=newBookPrice]').value = '';

}

//Remove book

function onRemoveBook(bookId) {
    var prevPageIdx = getCurrPageIdx();
    removeBook(bookId);
    var newPageIdx = getCurrPageIdx();
    renderBooks();
    renderPageBtns(prevPageIdx, newPageIdx);
}

// Renders

function setPageBtnsColor(prevPageIdx, newPageIdx) {
    var elPrevPage = document.querySelector(`.btn-${prevPageIdx}`);
    var elNewPage = document.querySelector(`.btn-${newPageIdx}`);
    if (elPrevPage) elPrevPage.style.backgroundColor = 'transparent';
    if (elNewPage) elNewPage.style.backgroundColor = '#dddddd86'
}

function renderPageBtns(prevPageIdx, newPageIdx) {
    var btnsCount = getNumOfPages();
    var strHTML = `<button class="prev-btn" onclick="onPrevPage()">\<\<</button>`
    for (var i = 0; i < btnsCount; i++) {
        strHTML += `<button class="btn-${i}" onclick="onSetPage(${i})">${i + 1}</button>`;
    }
    strHTML += `<button class="next-btn" onclick="onNextPage()">\>\></button>`;
    var elPageBtns = document.querySelector('.page-btns');
    elPageBtns.innerHTML = strHTML;
    setPageBtnsColor(prevPageIdx, newPageIdx);
}

function renderBooks() {
    var books = getBooksToDisplay();
    var strHTML = '';
    books.forEach(function (book) {
        strHTML += '<tr>'
        for (var key in book) {
            if (key === 'description') continue;
            else if (key === 'imgUrl') {
                strHTML += `<td><button class="read" onclick="onReadBook('${book.id}')" >Read</button></td>`
                strHTML += `<td><button class="update" onclick="onUpdateBook('${book.id}')" >Update</button></td>`
                strHTML += `<td><button class="remove" onclick="onRemoveBook('${book.id}')" >Delete</button></td>`
                continue;
            } else if (key === 'price') {
                strHTML += `<td>${book[key]}$</td>`
                continue;
            }
            strHTML += `<td>${book[key]}</td>`
        }
        strHTML += '</tr>'
    })
    var elTableBooks = document.querySelector('.books-data');
    elTableBooks.innerHTML = strHTML;
}