type Status = 'В работе' | 'Просрочена' | 'Есть отзыв' | 'Выполнена'
type Object = {
  name: string
  city: string
  street: string
}

export type Heading = {
  number: number
  status: Status
  isTechnological: boolean
}

export type Content = {
  creation_date: string
  check_date: string
  execution_date: string
  system: string
  type: string
  object: Object
  name: string
  city: string
  street: string
}

export type ApiResponse = {
  id: string
  number: Heading['number']
  creation_date: Content['creation_date']
  check_date: Content['check_date']
  execution_date: Content['execution_date']
  system: Content['system']
  type: Content['type']
  object: Content['object']
  text: string
  status: Heading['status']
  isTechnological: Heading['isTechnological']
  files: string[]
}
