import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/orders.dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({
    status: 201, example: {
      orderId: "9e84f188-9885-45e6-8c0c-dcee713807a4",
      orderDate: "2024-11-22T19:54:53.279Z",
      totalPrice: 89.98,
      orderDetailId: "7d040576-6f5c-4544-9593-c9d05f1f1549"
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
    status: 404, example: {
      message: "User not found.",
      error: "Not Found",
      statusCode: 404
    }
  })
  addOrder(@Body() order: CreateOrderDTO) {
    return this.ordersService.addOrder(order);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get order by id' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the order', type: String })
  @ApiResponse({
    status: 200, example: {
      id: "8c93c154-aa85-4b7a-a102-caee31b4a49a",
      date: "2024-11-19",
      orderDetails: {
        id: "e50a6449-f741-46d4-a90e-a82bd9f5e3bc",
        price: "199.99",
        products: [
          {
            id: "d043225a-ea3c-48da-8a17-5b12907b41af",
            name: "Iphone 15",
            description: "The best smartphone in the world",
            price: "199.99",
            stock: 12,
            imgUrl: "no_img.png"
          }
        ]
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
    status: 404, example: {
      message: "Order not found",
      error: "Not Found",
      statusCode: 404
    }
  })
  getOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getOrder(orderId);
  }
}
