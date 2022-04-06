import { ListEntity } from '../store/slices/listsSlice'

class Storage<T> {
  private readonly key: string

  constructor(key: string) {
    this.key = key
    if (!localStorage.getItem(this.key)) localStorage.setItem(this.key, JSON.stringify([]))
  }

  get(): T[] {
    try {
      return JSON.parse(localStorage.getItem(this.key) as string)
    } catch {
      return []
    }
  }

  set(value: T[]) {
    localStorage.setItem(this.key, JSON.stringify(value))
  }
}

export default {
  lists: new Storage<ListEntity>('lists'),
}
