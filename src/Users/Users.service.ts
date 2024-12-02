import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/Entities/Users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    async getUsers(page: number, limit: number): Promise<Omit<Users, 'password'>[]> {
        const [users] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['orders_id']
        });

        const usersWithoutPassword = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

        return usersWithoutPassword;
    }

    async getUserById(id: string): Promise<Partial<Users> | null> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['orders_id'],
        });

        if (!user) throw new NotFoundException(`User with ID ${id} not found`);

        const { password, isAdmin, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUser(userId: string, userData: Partial<Users>): Promise<Partial<Users>> {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        const result = await this.usersRepository.update(userId, userData);
        if (result.affected === 0) throw new NotFoundException(`User with ID ${userId} not found`);

        const updatedUser = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!updatedUser) throw new NotFoundException(`User with ID ${userId} not found`);

        const { password, isAdmin, ...userWithoutPassword } = updatedUser;

        return userWithoutPassword;
    }


    async deleteUser(userId: string): Promise<string> {
        const result = await this.usersRepository.delete(userId);
        if (result.affected === 0) throw new NotFoundException(`User with ID ${userId} not found`);

        return "User deleted successfully";
    }
}