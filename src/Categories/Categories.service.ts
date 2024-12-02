import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/Categories.entity';
import { Repository } from 'typeorm';
import * as data from "../assets/data.json"

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {}

    getCategories() { return this.categoriesRepository.find(); }

    addCategories() {
        data.map(async (product) => {
            await this.categoriesRepository
                .createQueryBuilder()
                .insert()
                .into(Categories)
                .values({ name: product.category })
                .orIgnore()
                .execute();
        });

        return { message: "Categories added." };
    }
}
