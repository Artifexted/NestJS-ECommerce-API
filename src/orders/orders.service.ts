import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dto/orders.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/Users.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/Entities/Products.entity';
import { OrderDetails } from 'src/Entities/OrderDetails.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { v4 as uuid } from "uuid";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>
    ) { }

    async addOrder(order: CreateOrderDTO) {
        const userFound = await this.usersRepository.findOne({ where: { id: order.userId } });
        if (!userFound) throw new NotFoundException("User not found.");

        const newOrder = this.ordersRepository.create({
            id: uuid(),
            user_id: userFound,
            date: new Date(),
        });

        await this.ordersRepository.save(newOrder);

        let totalPrice = 0;

        const productsToAdd: Products[] = [];

        for (const product of order.products) {
            const productFound = await this.productsRepository.findOne({ where: { id: product.id } });
            if (!productFound) throw new NotFoundException("Product not found.");

            if (productFound.stock <= 0) continue;

            productFound.stock -= 1;

            await this.productsRepository.save(productFound);

            productsToAdd.push(productFound);

            totalPrice += parseFloat(productFound.price.toString());
        }

        const newOrderDetail = this.orderDetailsRepository.create({
            id: uuid(),
            price: totalPrice,
            order_id: newOrder,
            products: productsToAdd,
        });

        await this.orderDetailsRepository.save(newOrderDetail);

        return { orderId: newOrder.id, orderDate: newOrder.date, totalPrice: totalPrice, orderDetailId: newOrderDetail.id };
    }

    async getOrder(orderId: string) {
        const foundOrder = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: ['orderDetails', 'orderDetails.products']
        });

        if (!foundOrder) throw new NotFoundException("Order not found");

        const productsData = [];

        for(let i = 0; i < foundOrder.orderDetails.products.length; i++) {
            productsData.push({prodName: foundOrder.orderDetails.products[i].name, prodImg: foundOrder.orderDetails.products[i].imgUrl})
        }

        return { id: foundOrder.id, date: foundOrder.date, totalPrice: foundOrder.orderDetails.price, products: productsData }
    }
}
