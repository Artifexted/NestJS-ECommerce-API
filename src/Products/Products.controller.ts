import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { createProductDTO, updateProductDTO } from "./dto/Products.dto";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller('products')
export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) { }

    @Get("seeder")
    @ApiOperation({ summary: 'Add products from a seeder' })
    @ApiResponse({
        status: 200, example: {
            message: 'Products added.'
        }
    })
    addProducts() {
        return this.ProductsService.addProducts();
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, default: 5 })
    @ApiOperation({ summary: 'Get all products with pagination' })
    @ApiResponse({
        status: 200, example: [
            {
                id: "3c2361ef-4d13-4172-b787-069eb085a2fb",
                name: "Logitech G502 Pro",
                description: "The best mouse in the world",
                price: "39.99",
                stock: 12,
                imgUrl: "no_img.png",
                category: {
                    id: "87c1e11a-d18e-4d08-9320-8f5dbfa0663c",
                    name: "mouse"
                }
            },
            {
                id: "415e89b9-5d2a-430b-b51e-e9eada715415",
                name: "Samsung Odyssey G9",
                description: "The best monitor in the world",
                price: "299.99",
                stock: 12,
                imgUrl: "no_img.png",
                category: {
                    id: "987c3082-0d8b-42c7-97ed-f423f7c447e7",
                    name: "monitor"
                }
            },
            {
                id: "069dcfb8-ec27-46f4-bcbf-d9ae495ae64d",
                name: "Samsung Galaxy S23",
                description: "The best smartphone in the world",
                price: "150.00",
                stock: 12,
                imgUrl: "no_img.png",
                category: {
                    id: "c1df28f3-366d-4097-b356-240bed70b281",
                    name: "smartphone"
                }
            },
            {
                id: "58ec72a7-1495-4249-b806-7da453560430",
                name: "Corsair K70",
                description: "The best keyboard in the world",
                price: "79.99",
                stock: 12,
                imgUrl: "no_img.png",
                category: {
                    id: "67b29136-9809-4320-a254-fd981ff1f6ac",
                    name: "keyboard"
                }
            },
            {
                id: "109aa26f-b7b1-4783-96c8-98d4ef327607",
                name: "Iphone 17",
                description: "Este todavia no salio",
                price: "2300.99",
                stock: 3,
                imgUrl: "https://example.com/iphone15.jpg",
                category: {
                    id: "c1df28f3-366d-4097-b356-240bed70b281",
                    name: "smartphone"
                }
            }
        ]
    })
    @ApiResponse({
        status: 400, example: {
            message: 'Page and limit must be greater than 0',
            error: 'Bad Request',
            statusCode: 400
        }
    })
    getProducts(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        if (page < 1 || limit < 1) {
            throw new BadRequestException("Page and limit must be greater than 0");
        }

        return this.ProductsService.getProducts(page, +limit)
    }

    @Post()
    // @UseGuards(AuthGuard) Debería ser utilizado, pero la actividad 4 de NestJS Auth (lecture8) no lo indica
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({
        status: 201, example: {
            id: "5ae23ae8-e488-49bc-b33e-54ae54d2d524",
            name: "Aifon 20",
            description: "The best smartphone in the world",
            price: 199.99,
            stock: 12,
            imgUrl: "https://example.com/iphone15.jpg",
            category: {
                id: "c1df28f3-366d-4097-b356-240bed70b281",
                name: "smartphone"
            }
        }
    })
    @ApiResponse({
        status: 400, example: {
            message: 'Validation failed', error: 'Bad Request'
        }
    })
    @ApiResponse({
        status: 404, example: {
            message: "Category not found.",
            error: "Not Found",
            statusCode: 404
        }
    })
    @ApiResponse({
        status: 409, example: {
            message: "Product already exists.",
            error: "Conflict",
            statusCode: 409
        }
    })
    createProduct(@Body() productData: createProductDTO) {
        return this.ProductsService.createProduct(productData);
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'The unique identifier of the product', type: String })
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({
        status: 200, example: {
            id: "3c2361ef-4d13-4172-b787-069eb085a2fb",
            name: "Logitech G502 Pro",
            description: "The best mouse in the world",
            price: "39.99",
            stock: 12,
            imgUrl: "no_img.png",
            category: {
                id: "87c1e11a-d18e-4d08-9320-8f5dbfa0663c",
                name: "mouse"
            }
        }
    })
    @ApiResponse({
        status: 400, example: {
            message: "Validation failed",
            error: "Bad Request",
            statusCode: 400
        }
    })
    @ApiResponse({
        status: 404, example: {
            message: "Product not found.",
            error: "Not Found",
            statusCode: 404
        }
    })
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ProductsService.getProductById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiParam({ name: 'id', description: 'The unique identifier of the product to be updated', type: String })
    @ApiOperation({ summary: 'Update product details' })
    @ApiResponse({
        status: 200, example: {
            id: "415e89b9-5d2a-430b-b51e-e9eada715415",
            name: "Samsung Odyssey G9 actualizado",
            description: "The best monitor in the world",
            price: "299.99",
            stock: 12,
            imgUrl: "no_img.png",
            category: {
                id: "987c3082-0d8b-42c7-97ed-f423f7c447e7",
                name: "monitor"
            }
        }
    })
    @ApiResponse({
        status: 400, example: {
            message: "Validation failed",
            error: "Bad Request",
            statusCode: 400
        }
    })
    @ApiResponse({
        status: 401, example: {
            message: "Missing token.",
            error: "Unauthorized",
            statusCode: 401
        }
    })
    @ApiResponse({
        status: 403, example: {
            message: "You are not allowed to access this information",
            error: "Forbidden",
            statusCode: 403
        }
    })
    @ApiResponse({
        status: 404, example: {
            message: "Product not found.",
            error: "Not Found",
            statusCode: 404
        }
    })
    updateProduct(@Param('id', ParseUUIDPipe) productId: string, @Body() productData: updateProductDTO) {
        return this.ProductsService.updateProduct(productId, productData);
    }

    @Delete(':id')
    // @UseGuards(AuthGuard) Debería ser utilizado, pero la actividad 4 de NestJS Auth (lecture8) no lo indica
    @ApiParam({ name: 'id', description: 'The unique identifier of the product to be deleted', type: String })
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({
        status: 200, example: {
            message: "Product deleted successfully"
        }
    })
    @ApiResponse({
        status: 400, example: {
            message: "Validation failed",
            error: "Bad Request",
            statusCode: 400
        }
    })
    @ApiResponse({
        status: 404, example: {
            message: "Product not found",
            error: "Not Found",
            statusCode: 404
        }
    })
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.ProductsService.deleteProduct(id);
    }
}