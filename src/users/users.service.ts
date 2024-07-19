import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHashPassword = (password)=>{
    return hashSync(password,genSaltSync(10));
  }

  async create(users:CreateUserDto){
    const hashPassword = this.getHashPassword(users.password);

    let user = await this.userModel.create({
      email:users.email,
      password:hashPassword,
      name:users.name,
    });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
      if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`
      return this.userModel.findOne({
        _id:id
      });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id:updateUserDto._id},{...updateUserDto});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
