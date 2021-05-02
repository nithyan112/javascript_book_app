class Book{
 constructor(title,author,isbn){
     this.title=title;
     this.author=author;
     this.isbn=isbn;
 }
}
class UI{
    addBookToList(book){
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
    showAlert(msg,errorClass)
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
    delete(e)
    {
        if(e.target.className==='delete')
        {
            e.target.parentElement.parentElement.remove();
        }

    }
    clear()
    {
        document.getElementById('title').value='';
        document.getElementById('author')  .value='';
         document.getElementById('isbn').value='';
    }
}

//LocalStorage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null)
        {
            books=[];
        }
        else{
            books= JSON.parse(localStorage.getItem('books'));

        }
        return books;

    }
    static displayBooks()
    {
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        })
        }

   static addBooks(book){
       const books = Store.getBooks();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));

    }
   static removeBook(isbn){

    const books = Store.getBooks();
    books.forEach(function(book,index){
        if(book.isbn===isbn){
            books.splice(index,1)
        }
    });
    localStorage.setItem('books',JSON.stringify(books));

    }
}

//Event Listener
//DOM Load 
document.addEventListener('DOMContentLoaded',Store.displayBooks);
document.getElementById('book-form').addEventListener('submit',function(e){
    e.preventDefault();
    const title = document.getElementById('title').value,
          author = document.getElementById('author')  .value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title,author,isbn);
    //console.log(book)
    const ui = new UI();
    //validate
    if(title===''|| author===''|| isbn ==='')
    {
        //Error alert
        ui.showAlert('please fill all fields','error');
    }
    else{
        ui.addBookToList(book);
        //add to local storage
        Store.addBooks(book);
        ui.clear();
        ui.showAlert('Book Added Succesfully','success')
    }
    //console.log(ui)
})

document.querySelector('#book-list').addEventListener('click',function(e)
{
   const ui = new UI();
   ui.delete(e);
   // remove from LS
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
   ui.showAlert('Book Deleted Succesfully','success')
})