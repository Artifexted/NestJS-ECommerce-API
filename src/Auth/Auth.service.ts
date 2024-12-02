import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/Entities/Users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>, private jwtService: JwtService) {}

  async signUp(registerData: Partial<Users>) {
    const foundUser = await this.usersRepository.findOneBy({ email: registerData.email });

    if(foundUser) throw new ConflictException('User already registered.');

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const newUser = {...registerData, password: hashedPassword}

    await this.usersRepository.save(newUser);

    const { password, isAdmin, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async signIn(email: string, password:string) {
    const foundUser = await this.usersRepository.findOneBy({ email });

    if(!foundUser) throw new NotFoundException('User not found.');

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if(!passwordMatch) throw new BadRequestException('Invalid credentials.');

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin
    }

    const token = this.jwtService.sign(payload);

    return { token, message: "User logged successfully." };
  }
}
