import { Module } from '@nestjs/common';
import { CategoriesService } from './Categories.service';
import { CategoriesController } from './Categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/Entities/Categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
