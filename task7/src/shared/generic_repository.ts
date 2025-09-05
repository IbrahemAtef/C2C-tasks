export interface IWithId {
  id: string;
}

export class GenericRepository<T extends IWithId> {
  private repository = new Map<string, T>();

  findAll(): T[] {
    return Array.from(this.repository.values());
  }

  findById(id: string): T | undefined {
    return this.repository.get(id);
  }

  findByKey<K extends keyof T>(key: K, value: T[K]): T | undefined {
    for (const entity of this.repository.values()) {
      if (entity[key] === value) {
        return entity;
      }
    }
    return undefined;
  }

  create(entity: T): T {
    this.repository.set(entity.id, entity);
    return entity;
  }

  update(id: string, partial: Partial<T>): T | undefined {
    const existing = this.repository.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...partial } as T;
    this.repository.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.repository.delete(id);
  }
}
