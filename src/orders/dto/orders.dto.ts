import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/Entities/Products.entity";

export class CreateOrderDTO {
    @ApiProperty({
        description: 'ID del usuario que realiza la orden. Debe ser un UUID válido.',
        example: 'b12a15f8-d2ad-4eab-954f-fb2c3b4c1a94',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        type: [Products],
        description: 'Lista de productos en la orden',
        example: [
            { id: '069dcfb8-ec27-46f4-bcbf-d9ae495ae64d' },
            { id: 'd043225a-ea3c-48da-8a17-5b12907b41af' }
        ]
    })
    @IsArray()
    @ArrayMinSize(1)
    products: Products[]
}
