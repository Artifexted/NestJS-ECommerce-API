import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Orders } from "./Orders.entity";
import { Products } from "./Products.entity";

@Entity({
    name: 'OrderDetails'
})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid(); //debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    @Column('numeric', {
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number// debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 
    
    @OneToOne(() => Orders)
    @JoinColumn()
    order_id: Orders// Relación 1:1 con orders.
    
    @ManyToMany(() => Products)
    @JoinTable({name: "OrderDetails_Products"})
    products: Products[]
    // Relación N:N con products.
}
