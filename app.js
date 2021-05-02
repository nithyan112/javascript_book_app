// Book Constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;

}



//UI Constructor
function UI(){

}
function Store(){}
 Store.prototype.getBooks=function(){
    let books;
    if(localStorage.getItem('books')===null)
    {
        books=[];

    }
    else{
        books= JSON.parse(localStorage.getItem('books'));
        console.log('hello',books)

    }
    return books;
 }
 Store.prototype.addBooks=function(book){
     const books = this.getBooks();
     books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
 }
 Store.prototype.displayBooks= function(){
    let books;
    if(localStorage.getItem('books')===null)
    {
        books=[];

    }
    else{
        books= JSON.parse(localStorage.getItem('books'));
        //console.log('hello',books)

    }
     books.forEach(function(book){
        const ui = new UI();
        ui.addBookToList(book);
    })
 }

 Store.prototype.remove = function(isbn){
    const books = this.getBooks();
    books.forEach(function(book,index){
        if(book.isbn===isbn){
            books.splice(index,1)
        }
    });
    localStorage.setItem('books',JSON.stringify(books));

    }

 






UI.prototype.addBookToList = function(book)
{
   //console.log(book)
   const list = document.getElementById('book-list');
   const row = document.createElement('tr');
   row.innerHTML= `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
   `;
   list.append(row);
}
UI.prototype.clear=function()
{
    document.getElementById('title').value='';
    document.getElementById('author')  .value='';
     document.getElementById('isbn').value='';
}


UI.prototype.showAlert = function(msg,errorClass)
{
   const container = document.querySelector('.container');
   const form_ele = document.querySelector('#book-form');
   const div = document.createElement('div');
   div.className=`alert ${errorClass}`
   //const text = document.createTextNode(msg);
    //console.log(text)
    div.appendChild(document.createTextNode(msg))
    container.insertBefore(div,form_ele);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
   
}
UI.prototype.delete = function(e)
{
    if(e.target.className==='delete')
    {
        e.target.parentElement.parentElement.remove();
    }
}
//Event Listener
//const ls = new Store();
document.addEventListener('DOMContentLoaded',new Store().displayBooks)
document.getElementById('book-form').addEventListener('submit',function(e){
    e.preventDefault();
    const title = document.getElementById('title').value,
          author = document.getElementById('author')  .value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);
    //console.log(book)
    const ui = new UI();
     const ls = new Store();
    //validate
    if(title===''|| author===''|| isbn ==='')
    {
        //Error alert
        ui.showAlert('please fill all fields','error');
    }
    else{
        ui.addBookToList(book);

        ls.addBooks(book)
        //addBooks(book);
        ui.clear();
        ui.showAlert('Book Added Succesfully','success')
    }
    //console.log(ui)
})

document.querySelector('#book-list').addEventListener('click',function(e)
{
   const ui = new UI();
   ui.delete(e);
   new Store().remove(e.target.parentElement.previousElementSibling.textContent)
   ui.showAlert('Book Deleted Succesfully','success')
})