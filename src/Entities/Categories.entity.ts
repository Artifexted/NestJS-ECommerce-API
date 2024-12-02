import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./Products.entity";

@Entity({
    name: 'Categories'
})
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid(); // debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    @Column({
        length: 50,
        nullable: false,
        unique: true //Agregado para no repetir nombres de productos
    })
    name: string //debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    @OneToMany(() => Products, (product) => product.category)
    products: Products[]
    //Relación: N:1 con products. Hecho al revés, de 1:N
}