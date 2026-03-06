//bussiness logic for users will be implemented here
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable() //user service is injectable to be used in other modules == is provider
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(data: Partial<CreateUserDto>) {
    return this.userModel.create({
      fullName: data.fullName,
      email: data.email,
      age: data.age ?? null,
      password: data.password ?? null,
      provider: data.provider,
    });
  }
  async findOneByEmail(email: string) {
    return this.userModel.findOne({
      where: { email },
    });
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return user?.update(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return user?.destroy();
  }
}
