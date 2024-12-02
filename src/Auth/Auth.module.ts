import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entities/Users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
