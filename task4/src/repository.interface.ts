export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | undefined>;
  create(item: T): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
  find(filter: Partial<T>): Promise<T[]>;
}
