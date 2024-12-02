import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(private fileRepository: FilesRepository, @InjectRepository(Products) private productsRepository: Repository<Products>) { }

    async uploadImg(productId: string, fileImg: Express.Multer.File) {
        const productFound = await this.productsRepository.findOneBy({id: productId})

        if(!productFound) throw new NotFoundException('Product not found.');

        const uploadFileImg = await this.fileRepository.uploadImg(fileImg);

        await this.productsRepository.update(productFound.id, { imgUrl: uploadFileImg.secure_url })

        return await this.productsRepository.findOneBy({ id: productId });
    }
}
