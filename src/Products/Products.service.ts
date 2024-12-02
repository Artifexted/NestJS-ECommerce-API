import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Products } from "src/Entities/Products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as data from "../assets/data.json"
import { Categories } from "src/Entities/Categories.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
    ) { }

    async addProducts() {
        const categories = await this.categoriesRepository.find();

        data?.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);

            const product = new Products()
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category

            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        })

        return { message: "Products added." };
    }

    async getProducts(page: number, limit: number): Promise<Products[]> {
        const [products] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['category']
        });
        return products;
    }

    async createProduct(productData): Promise<Products[]> {
        const foundProduct = await this.productsRepository.findOneBy({ name: productData.name });
        if (foundProduct) throw new ConflictException('Product already exists.');

        const foundCategory = await this.categoriesRepository.findOneBy({ id: productData.category });
        if (!foundCategory) throw new NotFoundException('Category not found.');

        const newProduct = this.productsRepository.create({ ...productData, category: foundCategory });
        return this.productsRepository.save(newProduct);
    }

    async getProductById(id: string): Promise<Products> {
        const productFound = await this.productsRepository.findOne({ where: { id }, relations: ['category'] });
        if (!productFound) throw new NotFoundException("Product not found.");

        return productFound;
    }

    async updateProduct(productId: string, productData): Promise<Products> {
        await this.productsRepository.update(productId, productData);
        return this.getProductById(productId);
    }

    async deleteProduct(productId: string) {
        const result = await this.productsRepository.delete(productId);
        if (result.affected === 0) throw new NotFoundException("Product not found");

        return { message: "Product deleted successfully" };
    }
}