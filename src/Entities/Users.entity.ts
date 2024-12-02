import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Orders } from "./Orders.entity";

@Entity({
    name: 'Users'
})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        length: 50,
        nullable: false
    })
    name: string //debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    @Column({
        length: 50,
        nullable: false,
        unique: true
    })
    email: string //debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.

    @Column({
        length: 80,
        nullable: false
    })
    password: string //debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.

    @Column({
        type: "bigint"
    })
    phone: number //debe ser un número entero.

    @Column({
        length: 50
    })
    country: string //debe ser una cadena de texto de máximo 50 caracteres.

    @Column()
    address: string //debe ser un texto.

    @Column({
        length: 50
    })
    city: string //debe ser una cadena de texto de máximo 50 caracteres.

    @Column({
        type: "boolean",
        default: false
    })
    isAdmin: boolean;

    @OneToMany(() => Orders, (order) => order.user_id)
    orders_id: Orders[] //Relación 1:N con orders.
}