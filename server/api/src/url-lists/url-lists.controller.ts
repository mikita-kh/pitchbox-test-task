import { Controller, Get, Post, Body, Param, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UrlListsService } from './url-lists.service';
import { CreateUrlListDto } from './dto/create-url-list.dto';

@Controller('url-lists')
export class UrlListsController {
    constructor(private readonly urlListsService: UrlListsService) {}

    @Post()
    create(@Body() createUrlListDto: CreateUrlListDto) {
        return this.urlListsService.create(createUrlListDto);
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit = 12,
    ) {
        return this.urlListsService.paginate({
            page,
            limit: Math.min(100, limit),
            countQueries: true,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.urlListsService.findOne(+id);
    }
}
