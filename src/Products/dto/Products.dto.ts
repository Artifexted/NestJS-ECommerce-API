
import { PartialType } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, IsUUID, Min } from "class-validator"

export class createProductDTO {
    /**
     * Nombre del producto. Descripción breve y única.
     * @example 'Iphone 15'
     */
    @IsNotEmpty()
    @IsString()
    name: string

    /**
     * Descripción del producto. Breve explicación sobre el producto.
     * @example 'The best smartphone in the world'
     */
    @IsNotEmpty()
    @IsString()
    description: string

    /**
     * Precio del producto. Debe ser un número positivo.
     * @example 199.99
     */
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number

    /**
     * Stock disponible del producto. Debe ser un número entero no negativo.
     * @example 12
     */
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number

    /**
     * URL de la imagen del producto. Debe ser una URL válida.
     * @example 'https://example.com/iphone15.jpg'
     */
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    imgUrl: string

    /**
     * Categoría del producto. Relacion a las categorías en la base de datos.
     * @example '987c3082-0d8b-42c7-97ed-f423f7c447e7'
     */
    @IsNotEmpty()
    @IsUUID()
    category: string
}

export class updateProductDTO extends PartialType(createProductDTO) {}
