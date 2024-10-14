import { Book, User } from './models'
export enum ItemType {
  Book = 'book',
  User = 'user',
}
export class Storage {
  addItem(item: Book | User): void {
    if (item instanceof Book) {
      const storedBooks = localStorage.getItem('bookList')
      const bookList: Book[] = storedBooks ? JSON.parse(storedBooks) : []
      bookList.push(item)
      localStorage.setItem('bookList', JSON.stringify(bookList))
      return
    }
    const storedUsers = localStorage.getItem('userList')
    const userList: User[] = storedUsers ? JSON.parse(storedUsers) : []
    userList.push(item)
    localStorage.setItem('userList', JSON.stringify(userList))
  }

  getList(type: ItemType): Book[] | User[] {
    if (type === ItemType.Book) {
      const storedBooks = localStorage.getItem('bookList')
      return storedBooks ? JSON.parse(storedBooks) : []
    }
    const storedUsers = localStorage.getItem('userList')
    return storedUsers ? JSON.parse(storedUsers) : []
  }
}
