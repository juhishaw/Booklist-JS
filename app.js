//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI() {}

//Add Book to list
UI.prototype.addBookToList = function(book) {
    // console.log(book);
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</td>
    `;

    list.appendChild(row);
}

//Show Alert
UI.prototype.showAlert = function(message, className) {
    //Create DIV
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert Alert
    container.insertBefore(div, form);

    //set timeout
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event Listeners for Add Book
document.getElementById('book-form').addEventListener('submit', 
function(e) {

    //Get form values

    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();
    
    ui.deleteBook(e.target);

    //Validate
    if(title === '' || author === '' || isbn === '') {
        //Error Alert
        ui.showAlert('Please fill in the fields', 'error');
    }else {
        //Add Book to list
        ui.addBookToList(book);
        // SHow success
        ui.showAlert('Book Added', 'success');

        //Clear Input fields
        ui.clearFields();
    }

    e.preventDefault();
});


//Event listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});