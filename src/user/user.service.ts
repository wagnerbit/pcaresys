import { Injectable, BadGatewayException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create(user: User) {
    await this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
