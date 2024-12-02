import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './Categories.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('seeder')
  @ApiOperation({ summary: 'Add categories from a seeder' })
  @ApiResponse({
    status: 200, example: {
      message: 'Categories added.'
    }
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200, example: [
      {
        "id": "987c3082-0d8b-42c7-97ed-f423f7c447e7",
        "name": "monitor"
      },
      {
        "id": "87c1e11a-d18e-4d08-9320-8f5dbfa0663c",
        "name": "mouse"
      },
      {
        "id": "c1df28f3-366d-4097-b356-240bed70b281",
        "name": "smartphone"
      },
      {
        "id": "67b29136-9809-4320-a254-fd981ff1f6ac",
        "name": "keyboard"
      }
    ]
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
