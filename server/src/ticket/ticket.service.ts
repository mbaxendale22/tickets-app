import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, EditTicketDto } from './dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}
  getTickets(userId: number) {
    return this.prisma.ticket.findMany({
      where: {
        userId,
      },
    });
  }

  async createTicket(userId: number, dto: CreateTicketDto) {
    const ticket = await this.prisma.ticket.create({
      data: {
        userId,
        ...dto,
      },
    });
    return ticket;
  }
  async getTicketById(userId: number, ticketId: number) {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id: ticketId,
        userId,
      },
    });
    return ticket;
  }

  async editTicketById(userId: number, ticketId: number, dto: EditTicketDto) {
    //get ticket by id
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });

    // check user owns the ticket
    if (!ticket || ticket.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    //edit the ticket

    return this.prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTicketById(userId: number, ticketId: number) {
    //get ticket by id
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    // check user owns the ticket
    if (!ticket || ticket.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    await this.prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
  }
}
