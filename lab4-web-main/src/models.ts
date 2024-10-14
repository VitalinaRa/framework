export class Book {
  id = new Date().getTime()
  title!: string
  year!: string
  author!: string
  borrowed: boolean = false
}

export class User {
  id = new Date().getTime()
  name!: string
  email!: string
}
