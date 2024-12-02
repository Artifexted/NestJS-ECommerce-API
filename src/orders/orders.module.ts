import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entities/Users.entity';
import { Products } from 'src/Entities/Products.entity';
import { Orders } from 'src/Entities/Orders.entity';
import { OrderDetails } from 'src/Entities/OrderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Users, Products, Orders, OrderDetails ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
