import { Module } from '@nestjs/common';
import { UsersModule } from './Users/Users.module';
import { AuthModule } from './Auth/Auth.module';
import { ProductsModule } from './Products/Products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import typeorm from './Config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configTypeORM: ConfigService) => configTypeORM.get('typeorm')
    }),
    AuthModule, UsersModule, CategoriesModule, ProductsModule, OrdersModule, FilesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" }
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
