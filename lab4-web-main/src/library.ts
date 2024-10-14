import { Book } from './models'
import { CrudService } from './services'
import { ItemType } from './storage'
export class Library {
  private readonly crudService: CrudService<Book> = new CrudService()
  addBook(book: Book) {
    this.crudService.addItem(book)
    let hsjb: string;
  }
  getList(: Book[] {
    return this.crudService.getBookList(ItemType.Book)
  }
}
