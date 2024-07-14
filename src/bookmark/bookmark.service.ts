import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatebookmarkDto, EditbookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createbookmark(userid: number, dto: CreatebookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId: userid, ...dto },
    });
    return bookmark;
  }

  async getbookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
    });
    return bookmarks;
  }

  async getOneBookmark(userId: number, bookmarkid: number) {
    return await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkid,
        userId,
      },
    });
  }

  async editbookmark(userId: number, dto: EditbookmarkDto, bookmarkid: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkid,
      },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkid,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletebookmark(userId: number, bookmarkid: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkid,
      },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkid,
      },
    });
  }
}
