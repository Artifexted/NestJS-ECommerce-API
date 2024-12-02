import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./Users.entity";
import { OrderDetails } from "./OrderDetails.entity";

@Entity({
    name: 'Orders'
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid(); //debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    @ManyToOne(() => Users, (user) => user.orders_id )
    user_id: Users //(Relación N:1) con users.
    
    @Column({ type: "date" })
    date: Date; // date
    
    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order_id)
    orderDetails: OrderDetails; // Relación 1:1 con OrderDetails
}
