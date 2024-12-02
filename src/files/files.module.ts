import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig } from 'src/Config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/Entities/Products.entity';
import { FilesRepository } from './files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, FilesRepository],
})
export class FilesModule {}
