import { IRepository } from "./repository.interface";
import { IDbEntity } from "./models";

export abstract class BaseRepository<T extends IDbEntity>
  implements IRepository<T>
{
  protected items: T[] = [];

  constructor(initialData: T[]) {
    this.items = [...initialData];
  }
  async getAll(): Promise<T[]> {
    return this.items;
  }
  async getById(id: number): Promise<T | undefined> {
    return this.items.find((item) => item.id === id);
  }
  async create(payload: T): Promise<T> {
    this.items.push(payload);
    return payload;
  }
  async update(id: number, payload: Partial<T>): Promise<T | undefined> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return undefined;
    this.items[index] = { ...this.items[index], ...payload };
    return this.items[index];
  }
  async delete(id: number): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
  async find(payload: Partial<T>): Promise<T[]> {
    return this.items.filter((item) =>
      Object.entries(payload).every(
        ([key, value]) => item[key as keyof T] === value
      )
    );
  }
}
