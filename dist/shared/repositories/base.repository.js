"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async find(filter = {}) {
        return this.model.find(filter).exec();
    }
    async create(data) {
        return this.model.create(data);
    }
    async updateById(id, data) {
        return this.model
            .findByIdAndUpdate(id, data, { returnDocument: 'after' })
            .exec();
    }
    async deleteById(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async count(filter = {}) {
        return this.model.countDocuments(filter).exec();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map