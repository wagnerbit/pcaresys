import * as classValidator from 'class-validator';

export class CreateUserDto {
  @classValidator.IsString()
  readonly firstName: string;

  @classValidator.IsString()
  readonly middleName: string;

  @classValidator.IsString()
  readonly lastName: string;

  @classValidator.IsDateString()
  readonly birthDate: string;

  @classValidator.IsString()
  readonly cpf: string;
}
