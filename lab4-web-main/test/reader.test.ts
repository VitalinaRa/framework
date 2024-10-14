/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODAL_ERROR_BORROW_MESSAGE, MODAL_SUCCESS_BORROW_MESSAGE, MODAL_SUCCESS_RETURN_MESSAGE } from '../src/core'
import { Book, User } from '../src/models'
import { Reader } from '../src/reader'
import { ItemType } from '../src/storage'
import assert from 'assert'

class MockCrudService<T> {
  private items: { [key: string]: T[] } = {
    [ItemType.User]: [],
  }

  addItem(item: T): void {
    this.items[ItemType.User].push(item)
  }

  getBookList(type: ItemType): T[] {
    return this.items[type] || []
  }
}

// Тести
describe('Reader', function () {
  let reader: Reader
  let mockCrudService: MockCrudService<User>

  beforeEach(function () {
    mockCrudService = new MockCrudService<User>()
    reader = new Reader()
    ;(reader as any).crudService = mockCrudService
  })

  it('should add a user', function () {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    }
    reader.addUser(user)
    const users = mockCrudService.getBookList(ItemType.User)

    assert.strictEqual(users.length, 1, 'The user list should contain one user')
    assert.deepStrictEqual(users[0], user, 'The added user should match the expected user')
  })

  it('should get the list of users', function () {
    const user1: User = {
      id: 1,
      name: 'Test User 1',
      email: 'test1@example.com',
    }
    const user2: User = {
      id: 2,
      name: 'Test User 2',
      email: 'test2@example.com',
    }
    mockCrudService.addItem(user1)
    mockCrudService.addItem(user2)
    const users = reader.getList()
    assert.deepStrictEqual(users, [user1, user2], 'The list of users should match the added users')
  })

  it('should borrow a book when limit is not exceeded', function () {
    const book: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      year: '',
      borrowed: false,
    }
    const message = reader.borrow(book)
    assert.strictEqual(message, MODAL_SUCCESS_BORROW_MESSAGE, 'The borrow message should indicate success')
    assert.strictEqual(reader.borrowedBooks.length, 1, 'The borrowedBooks list should contain one book')
    assert.deepStrictEqual(reader.borrowedBooks[0], book, 'The borrowed book should match the expected book')
  })

  it('should not borrow a book when limit is exceeded', function () {
    const book1: Book = { id: 1, title: 'Test Book 1', author: 'Author 1', year: '', borrowed: false }
    const book2: Book = { id: 2, title: 'Test Book 2', author: 'Author 2', year: '', borrowed: false }
    const book3: Book = { id: 3, title: 'Test Book 3', author: 'Author 3', year: '', borrowed: false }
    const book4: Book = { id: 4, title: 'Test Book 4', author: 'Author 4', year: '', borrowed: false }

    reader.borrow(book1)
    reader.borrow(book2)
    reader.borrow(book3)
    const message = reader.borrow(book4)
    assert.strictEqual(message, MODAL_ERROR_BORROW_MESSAGE, 'The borrow message should indicate error when limit is exceeded')
    assert.strictEqual(reader.borrowedBooks.length, 3, 'The borrowedBooks list should still contain three books')
  })

  it('should return a book', function () {
    const book: Book = {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      year: '',
      borrowed: false,
    }
    reader.borrow(book)
    const message = reader.returnBook(book.id)
    assert.strictEqual(message, MODAL_SUCCESS_RETURN_MESSAGE, 'The return message should indicate success')
    assert.strictEqual(reader.borrowedBooks.length, 0, 'The borrowedBooks list should be empty after returning the book')
  })
})
