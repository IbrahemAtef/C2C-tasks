/**
 * Generic Repository for Prisma models
 * @template T - Entity type
 * @template M - Prisma model delegate type (e.g., PrismaClient['user'])
 */
export class GenericRepository<T, M extends { [key: string]: any }> {
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

  async delete(id: string): Promise<T> {
    return await this.model.delete({ where: { id } });
  }
}
