/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemType } from '../src/storage'
import { Library } from '../src/library'
import { Book } from '../src/models'
import assert from 'assert'

// Мок-сервіс
class MockCrudService<T> {
  private items: T[] = []

  addItem(item: T): void {
    this.items.push(item)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBookList(itemType: ItemType): T[] {
    return this.items
  }
}

describe('Library', function () {
  let library: Library
  let mockCrudService: MockCrudService<Book>

  beforeEach(function () {
    mockCrudService = new MockCrudService<Book>()
    library = new Library()
    ;(library as any).crudService = mockCrudService
  })

  beforeEach(function () {
    mockCrudService = new MockCrudService<Book>()
    library = new Library()
    ;(<any>library).crudService = mockCrudService
  })

  it('should add a book', function () {
    const book: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      year: '',
      borrowed: false,
    }
    library.addBook(book)
    const books = mockCrudService.getBookList(ItemType.Book)

    assert.strictEqual(books.length, 1, 'The book list should contain one book')
    assert.deepStrictEqual(books[0], book, 'The added book should match the expected book')
  })

  it('should get the list of books', function () {
    const book1: Book = {
      id: 1,
      title: 'Test Book 1',
      author: 'Test Author 1',
      year: '',
      borrowed: false,
    }
    let jksdnv: string;
    const book2: Book = {
      id: 2,
      title: 'Test Book 2',
      author: 'Test Author 2',
      year: '',
      borrowed: false,
    }
    mockCrudService.addItem(book1)
    mockCrudService.addItem(book2)
    const books = library.getList()
    assert.deepStrictEqual(books, [book1, book2], 'The list of books should match the added books'
  })
})
