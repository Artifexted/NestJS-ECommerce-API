import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { updateUserDTO } from "./dto/Users.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiBearerAuth()
    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiQuery({ name: 'page', required: false, description: 'The page number for pagination (default is 1)', type: Number, default: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'The maximum number of users per page (default is 5)', type: Number, default: 5 })
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200, example: [
            {
                id: "5bd3beb2-170b-473c-9806-e9cc0c786b67",
                name: "Usuario Prueba",
                email: "prueba@gmail.com",
                phone: "5493413413413",
                country: "Australia",
                address: "Calleviva 123 falsa",
                city: "Melbourne",
                isAdmin: false,
                orders_id: [
                    {
                        id: "8c93c154-aa85-4b7a-a102-caee31b4a49a",
                        date: "2024-11-19"
                    }
                ]
            },
            {
                id: "5bac3fd8-b40f-4b85-91f5-44bde3e42714",
                name: "Agustin",
                email: "agustinssss@mail.com",
                phone: "34134134314",
                country: "Argentina",
                address: "Calleviva 123",
                city: "Rosario",
                isAdmin: false,
                orders_id: []
            },
            {
                id: "0e5c9848-65c2-4d04-b620-d110efc51388",
                name: "Agustin",
                email: "agustin@mail.com",
                phone: "3411234567",
                country: "Argentina",
                address: "Av. Siempreviva 742",
                city: "Rosario",
                isAdmin: true,
                orders_id: []
            },
            {
                id: "7742e9ae-b79a-440d-8003-b4ffb50bc768",
                name: "Tomas",
                email: "tomy@mail.com",
                phone: "3411234567",
                country: "Argentina",
                address: "Av. Siempreviva 742",
                city: "Rosario",
                isAdmin: false,
                orders_id: []
            }
        ]
    })
    @ApiResponse({
        status: 400, example: {
            message: "Page and limit must be greater than 0",
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
        status: 403, example: {
            message: "You are not allowed to access this information",
            error: "Forbidden",
            statusCode: 403
        }
    })
    getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        if (page < 1 || limit < 1) {
            throw new BadRequestException('Page and limit must be greater than 0');
        }

        return this.usersService.getUsers(page, +limit)
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the user', type: String })
    @ApiResponse({
        status: 200, example: {
            id: "0e5c9848-65c2-4d04-b620-d110efc51388",
            name: "Agustin",
            email: "agustin@mail.com",
            phone: "3411234567",
            country: "Argentina",
            address: "Av. Siempreviva 742",
            city: "Rosario",
            orders_id: [
                {
                    id: "8c93c154-aa85-4b7a-a102-caee31b4a49a",
                    date: "2024-11-19"
                },
                {
                    id: "48bf9933-a1fd-4440-b736-fa1393269938",
                    date: "2024-11-21"
                }
            ]
        }
    })
    @ApiResponse({
        status: 404, example: {
            message: "User with ID 0e5c9848-65c2-4d04-b620-d110efc51387 not found",
            error: "Not Found",
            statusCode: 404
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
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update user details' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the user to be updated', type: String })
    @ApiResponse({
        status: 200, example: {
            id: "0e5c9848-65c2-4d04-b620-d110efc51388",
            name: "Agustincito",
            email: "agustin@mail.com",
            phone: "3411234567",
            country: "Argentina",
            address: "Av. Siempreviva 742",
            city: "Rosario"
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
            message: "User with ID 5bd3beb2-170b-473c-9806-e9cc0c786b67 not found",
            error: "Not Found",
            statusCode: 404
        }
    })
    updateUser(@Param('id', ParseUUIDPipe) userId: string, @Body() userData: updateUserDTO) {
        return this.usersService.updateUser(userId, userData);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', description: 'The unique identifier of the user to be deleted', type: String })
    @ApiResponse({
        status: 200, example: {
            message: "User deleted successfully",
            statusCode: 200
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
            message: "User with ID 5bd3beb2-170b-473c-9806-e9cc0c786b67 not found",
            error: "Not Found",
            statusCode: 404
        }
    })
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
