import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @ApiBearerAuth()
  @Post('/uploadImage/:productId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('fileImg'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to upload',
    schema: {
      type: 'object',
      properties: {
        fileImg: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload image for a product' })
  @ApiParam({ name: 'productId', description: 'The unique identifier of the product', type: String })
  @ApiResponse({
    status: 200, example: {
      id: "5aa74c38-afd4-4190-9f1d-ab78bbb6178c",
      name: "Razer Viper",
      description: "The best mouse in the world",
      price: "49.99",
      stock: 12,
      imgUrl: "https://res.cloudinary.com/dxqji5xmo/image/upload/v1732305829/ah3gpkt8mpkfbts73hk5.png"
    }
  })
  @ApiResponse({
    status: 400, example: {
      message: "File must be maximum 200kb",
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
      message: "Product not found.",
      error: "Not Found",
      statusCode: 404
    }
  })
  async uploadImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File must be maximum 200kb'
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/
          })
        ]
      })
    ) fileImg: Express.Multer.File) {
    return this.filesService.uploadImg(productId, fileImg);
  }
}
