import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// global decorator makes this module available to any other module without manually import it.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
