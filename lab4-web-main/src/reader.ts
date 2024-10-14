import { MODAL_ERROR_BORROW_MESSAGE, MODAL_SUCCESS_BORROW_MESSAGE, MODAL_SUCCESS_RETURN_MESSAGE } from './core'
import { Book, User } from './models'
import { CrudService } from './services'
import { ItemType } from './storage'

export class Reader {
  borrowedBooks: Book[] = []
  private readonly crudService: CrudService<User> = new CrudService()
  addUser(user: User) {
    this.crudService.addItem(user)
  }
  getList() {
    return this.crudService.getBookList(ItemType.User)
  }
  borrow(book: Book): string {
    if (this.borrowedBooks.length < 3) {
      this.borrowedBooks.push(book)

      return MODAL_SUCCESS_BORROW_MESSAGE
    }
    return MODAL_ERROR_BORROW_MESSAGE
  }
  returnBook(bookId: number): string {
    this.borrowedBooks = this.borrowedBooks.filter((book) => book.id !== bookId)
    return MODAL_SUCCESS_RETURN_MESSAGE
  }
}
