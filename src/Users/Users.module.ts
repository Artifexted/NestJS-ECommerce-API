import { Module } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { UsersController } from "./Users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Entities/Users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule { }