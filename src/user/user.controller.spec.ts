import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
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
          birthDate:'1991-03-07',
          cpf: '11296834575',
        },
      ];
      jest.spyOn(userService, 'findAll').mockImplementation(() => result);

      expect(await userController.findAll()).toBe(result);
    });
  });
});
