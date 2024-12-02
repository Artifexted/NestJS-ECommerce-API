import { Module } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { ProductsController } from "./Products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Entities/Products.entity";
import { Categories } from "src/Entities/Categories.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),
        TypeOrmModule.forFeature([Categories])
    ],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule { }