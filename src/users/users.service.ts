import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { compareSync } from 'bcrypt';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
import { User } from 'src/decorator/customize';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) 
    private userModel: SoftDeleteModel<UserDocument>
    
  ) {}
  getHashPassword = (password)=>{
    return hashSync(password,genSaltSync(10));
  }

  async create(createUserDto:CreateUserDto,@User() user:IUser){
    const {name,email,password,age,gender,address,role,company} = createUserDto;
    const hashPassword = await this.getHashPassword(password)

    //add logic check email
    // const isExist = await this.userModel.findOne({email});
    // if (isExist) {
    //   throw new BadRequestException(`Email:${email} đã tồn tại trên hệ thống.Vui lòng đăng nhập email khác`)
    // }
    const newUser = this.userModel.create({
      name,email,
      password:hashPassword,age,
      gender,address,
      role,company,
      createdBy:{
        _id:user._id,
        email:user.email
      }
    })
    return newUser
  }

  async findAll(currentPage :number,limit:number,qs:string) {
    const { filter, sort, population } = aqp(qs);
    
    delete filter.page;
    delete filter.limit;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.userModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any)
    .populate(population)
    .exec();

    return {
      meta: {
      current: currentPage, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      pages: totalPages, //tổng số trang với điều kiện query
      total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
      }
  }

  findOne(id: string) {
      if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`
      return this.userModel.findOne({
        _id:id
      }).select("-password");
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email:username
    });
  }

  isValidPassword(password,hashPassword){
    return compareSync(password,hashPassword);
  }
  async update(updateUserDto: UpdateUserDto, @User() user:IUser) {
    return await this.userModel.updateOne(
      {_id:updateUserDto._id},
      {
        ...updateUserDto,
        updatedBy:{
          _id:user._id,
          email:user.email
        }
      }
    );
  }

  async remove(id: string,@User() user:IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`
    await this.userModel.updateOne({
      deletedBy:{
        _id:user._id,
        email:user.email
      }
    })
    return this.userModel.softDelete({
      _id:id,
    });
  }
  
  async register(user:RegisterUserDto){
    const {name,email,password,age,gender} = user;
    const isExist = await this.userModel.findOne({email});
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại.Vui lòng đăng ký tài khoản khác`);
    }
    const hashPassword = await this.getHashPassword(password);
    const newUser = await this.userModel.create({
      name,
      email,
      password:hashPassword,
      age,
      gender
    })
    return newUser
  }
}
