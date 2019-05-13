import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
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
