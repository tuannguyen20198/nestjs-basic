import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { compareSync } from 'bcrypt';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: SoftDeleteModel<UserDocument>
    
  ) {}
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

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email:username
    });
  }

  isValidPassword(password,hashPassword){
    return compareSync(password,hashPassword);
  }
  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id:updateUserDto._id},{...updateUserDto});
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`
    return this.userModel.softDelete({
      _id:id
    });
  }
}
