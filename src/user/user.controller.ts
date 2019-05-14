import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { Roles } from '../infrastructure/decorators/roles.decorator';
import { RolesGuard } from '../infrastructure/guards/roles.guard';
import { LoggingInterceptor } from '../infrastructure/interceptors/logging.interceptor';
import { TransformInterceptor } from '../infrastructure/interceptors/transform.interceptor';
import { ParseIntPipe } from '../infrastructure/pipes/parse-int.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { HttpExceptionFilter } from '../infrastructure/filters/http-exception.filter';
import { ValidationPipe } from '../infrastructure/pipes/validation.pipe';

@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  // @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  findOne(
    @Param('id', new ParseIntPipe())
    id,
  ) {
    // logic
  }
}
