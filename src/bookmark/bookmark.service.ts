import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatebookmarkDto, EditbookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createbookmark(userid: number, dto: CreatebookmarkDto) {
    // await this.prisma.bookmark.create({ ...dto });
  }

  async getbookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
    });
  }

  getOneBookmark(userId: number, bookmarkid: number) {}

  editbookmark(userId: number, dto: EditbookmarkDto, bookmarkid: number) {}

  deletebookmark(userId: number, bookmarkid: number) {}
}
