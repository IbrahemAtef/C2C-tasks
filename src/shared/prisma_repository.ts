import { IGenericRepository } from "./IGenericRepository";

/**
 * Generic Repository for Prisma models
 * @template T - Entity type
 * @template M - Prisma model delegate type (e.g., PrismaClient['user'])
 */
export class PrismaRepository<T, M extends { [key: string]: any }>
  implements IGenericRepository<T>
{
  protected model: M;

  constructor(model: M) {
    this.model = model;
  }

  async findAll(query?: any): Promise<T[]> {
    return await this.model.findMany(query);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async create(data: T): Promise<T> {
    return await this.model.create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const existing = await this.model.findUnique({ where: { id } });
    if (!existing) return null;

    return await this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.model.delete({ where: { id } });
    return Boolean(deleted);
  }
}
