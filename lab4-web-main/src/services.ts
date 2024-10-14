import { Book, User } from './models'
import { ItemType, Storage } from './storage'
export class CrudService<T extends Book | User> {
  private readonly storage: Storage = new Storage()

  addItem(item: T): void {
    this.storage.addItem(item)
  }
  getBookList(type: ItemType): T[] {
    return <T[]>this.storage.getList(type)
  }
}
