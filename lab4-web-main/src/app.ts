import { Library } from './library'
import { CustomModal } from './modal'
import { Book, User } from './models'
import { Reader } from './reader'

class App {}

const userList: HTMLElement = document.getElementById('userList')!
const bookList: HTMLElement = document.getElementById('bookList')!

const library: Library = new Library()
const userManager: Reader = new Reader()

const modalToShowInfo = new CustomModal(document.getElementById('notificationModal')!, document.getElementById('modalMessage')!)
const borrowReturnModal = document.getElementById('borrowReturnModal')!
const modalToAct = new CustomModal(borrowReturnModal, null)

document.addEventListener('DOMContentLoaded', () => {
  new App()

  const userForm: HTMLFormElement = document.getElementById('userForm') as HTMLFormElement
  const bookForm: HTMLFormElement = document.getElementById('bookForm') as HTMLFormElement

  const borrowBookBtn = document.getElementById('borrowBookBtn')!
  const returnBookBtn = document.getElementById('returnBookBtn')!

  const userIdInput = document.getElementById('userId') as HTMLInputElement
  const bookIdInput = document.getElementById('bookId') as HTMLInputElement

  const titleInput = document.getElementById('title') as HTMLInputElement
  const authorInput = document.getElementById('author') as HTMLInputElement
  const yearInput = document.getElementById('year') as HTMLInputElement

  const nameInput = document.getElementById('name') as HTMLInputElement
  const emailInput = document.getElementById('email') as HTMLInputElement

  render(userManager, library)

  borrowBookBtn.addEventListener('click', () => {
    const userId = Number(userIdInput.value)
    const bookId = Number(bookIdInput.value)

    const book = library.getList().find((book) => book.id === bookId)
    const user = userManager.getList().find((user) => user.id === userId)

    if (book && user && !book.borrowed) {
      const message = userManager.borrow(book)
      book.borrowed = true
      render(userManager, library)
      modalToShowInfo.show(message)
      const books = library.getList().map((book) => {
        if (book.id === bookId) {
          book.borrowed = true
        }
        return book
      })
      localStorage.setItem('bookList', JSON.stringify(books))
      const button = document.querySelector(`button[data-book-id='${bookId}']`) as HTMLButtonElement
      editBtnState(button, book.borrowed)
    } else {
      modalToShowInfo.show('Користувач або книга не знайдені, або книга вже позичена.')
    }
  })

  returnBookBtn.addEventListener('click', () => {
    const userId = Number(userIdInput.value)
    const bookId = Number(bookIdInput.value)

    const book = library.getList().find((book) => book.id === bookId)
    const user = userManager.getList().find((user) => user.id === userId)

    if (book && user && book.borrowed) {
      const message = userManager.returnBook(bookId)
      book.borrowed = false
      const books = library.getList().map((book) => {
        if (book.id === bookId) {
          book.borrowed = false
        }
        return book
      })
      localStorage.setItem('bookList', JSON.stringify(books))
      render(userManager, library)
      modalToShowInfo.show(message)

      const button = document.querySelector(`button[data-book-id='${bookId}']`) as HTMLButtonElement
      editBtnState(button, book.borrowed)
    } else {
      modalToShowInfo.show('Користувач або книга не знайдені, або книга ще не була позичена.')
    }
  })

  userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (userForm.checkValidity()) {
      const user = new User()
      user.email = emailInput.value
      user.name = nameInput.value
      userManager.addUser(user)
      render(userManager, library)
      modalToShowInfo.show('Користувач доданий успішно!')
    }
  })

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (bookForm.checkValidity()) {
      const book = new Book()
      book.author = authorInput.value
      book.title = titleInput.value
      book.year = yearInput.value
      library.addBook(book)
      render(userManager, library)
      modalToShowInfo.show('Книга додана успішно!')
    }
  })
})

function render(userManager: Reader, library: Library): void {
  userList.innerHTML = ''
  bookList.innerHTML = ''

  const users = userManager.getList()
  const books = library.getList()

  users.forEach((user: User) => {
    const child = document.createElement('li')
    child.className = 'list-group-item'
    child.innerHTML = `${user.id} ${user.email} ${user.name}`
    userList.appendChild(child)
  })

  books.forEach((book: Book) => {
    const item = document.createElement('li')
    item.className = 'list-group-item d-flex justify-content-between align-items-center'

    const bookInfo = document.createElement('span')
    bookInfo.innerHTML = `${book.id} ${book.author} ${book.year} ${book.title}`

    const button = document.createElement('button')
    button.dataset.bookId = String(book.id)
    editBtnState(button, book.borrowed)
    button.onclick = () => {
      if (book.borrowed) {
        modalToAct.show('Поверніть книгу користувачем.')
      } else {
        modalToAct.show('Позичити книгу користувачем.')
      }
    }

    item.appendChild(bookInfo)
    item.appendChild(button)

    bookList.appendChild(item)
  })
}

function editBtnState(button: HTMLButtonElement, isBorrowed: boolean) {
  button.innerHTML = isBorrowed ? 'Повернути книгу' : 'Позичити книгу'
  button.className = isBorrowed ? 'btn btn-warning' : 'btn btn-info'
}
