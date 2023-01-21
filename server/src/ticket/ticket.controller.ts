import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateTicketDto, EditTicketDto } from './dto';
import { TicketService } from './ticket.service';

@UseGuards(JwtGuard)
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}
  @Get()
  getTickets(@GetUser('id') userId: number) {
    return this.ticketService.getTickets(userId);
  }

  @Get(':id')
  getTicketById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ticketId: number,
  ) {
    return this.ticketService.getTicketById(userId, ticketId);
  }

  @Post()
  createTicket(@GetUser('id') userId: number, @Body() dto: CreateTicketDto) {
    console.log('***** hello');
    return this.ticketService.createTicket(userId, dto);
  }

  @Patch(':id')
  editTicketById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ticketId: number,
    @Body() dto: EditTicketDto,
  ) {
    return this.ticketService.editTicketById(userId, ticketId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTicketById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) ticketId: number,
  ) {
    return this.ticketService.deleteTicketById(userId, ticketId);
  }
}
