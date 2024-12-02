import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categories } from "./Categories.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({
    name: 'Products'
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid(); // debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    @Column({
        length: 50,
        nullable: false,
        unique: true //Agregado para que no haya 2 productos con el mismo nombre
    })
    name: string; // debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    @Column({
        nullable: false
    })
    description: string; // debe ser un texto y no puede ser nulo.

    @Column('numeric', {
        nullable: false,
        precision: 10,
        scale: 2
    })
    price: number; // debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo.

    @Column({
        nullable: false
    })
    stock: number; // debe ser un valor numérico. No puede ser nulo.

    @Column({
        default: "no_img.png"
    })
    imgUrl: string; // debe ser una cadena de texto, en caso de no recibir un valor debe asignar una imagen por defecto.

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Categories //(Relación 1: N) Hecho al revés, de N:1

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails // Relación N: N con orderDetails.
}