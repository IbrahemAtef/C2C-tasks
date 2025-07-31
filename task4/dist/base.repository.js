"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    items = [];
    constructor(initialData) {
        this.items = [...initialData];
    }
    async getAll() {
        return this.items;
    }
    async getById(id) {
        return this.items.find((item) => item.id === id);
    }
    async create(payload) {
        this.items.push(payload);
        return payload;
    }
    async update(id, payload) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1)
            return undefined;
        this.items[index] = { ...this.items[index], ...payload };
        return this.items[index];
    }
    async delete(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
    async find(payload) {
        return this.items.filter((item) => Object.entries(payload).every(([key, value]) => item[key] === value));
    }
}
exports.BaseRepository = BaseRepository;
