import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorators/get-user';
import { CreatebookmarkDto, EditbookmarkDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkservice: BookmarkService) {}
  @Post()
  createbookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreatebookmarkDto,
  ) {
    return this.bookmarkservice.createbookmark(userId, dto);
  }

  @Get()
  getbookmarks(@GetUser('id') userId: number) {
    return this.bookmarkservice.getbookmarks(userId);
  }

  @Get(':id')
  getOneBookmark(
    @GetUser('id') userId: number,
    @Param('id') bookmarkid: number,
  ) {
    return this.bookmarkservice.getOneBookmark(userId, bookmarkid);
  }

  @Patch(':id')
  editbookmark(
    @GetUser('id') userId: number,
    @Body() dto: EditbookmarkDto,
    @Param('id') bookmarkid: number,
  ) {
    return this.bookmarkservice.editbookmark(userId, dto, bookmarkid);
  }

  @Delete(':id')
  deletebookmark(
    @GetUser('id') userId: number,
    @Param('id') bookmarkid: number,
  ) {
    return this.bookmarkservice.deletebookmark(userId, bookmarkid);
  }
}
