import { Injectable, BadGatewayException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    const users = [
      {
        firstName: 'Wagner',
        middleName: 'Bitencourt',
        lastName: 'Alves',
        birthDate: '1992-07-22',
        cpf: '07007934455',
      },
      {
        firstName: 'Marcos',
        middleName: 'Paulo',
        lastName: 'Oliveira',
        birthDate: '1991-03-07',
        cpf: '11296834575',
      },
    ];

    throw new BadGatewayException();

    return users;
  }
}
