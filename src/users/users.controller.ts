import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users') // => /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create( @Body()  CreateUserDto:CreateUserDto, @User() user:IUser) 
  {
    return this.usersService.create(CreateUserDto,user);
  }

  @Get()
  @ResponseMessage("Fetch user with paginate")
  findAll(
    @Query("page") currentPage:string,
    @Query("page") limit:string,
    @Query() qs:string,
  ) {
    return this.usersService.findAll(+currentPage,+limit,qs);
  }
  @Public()
  @Get(':id')
  @ResponseMessage("Fetch user by id")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @ResponseMessage("Update a User")
  update(@Body() updateUserDto: UpdateUserDto, @User() user:IUser) {
    return this.usersService.update( updateUserDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.usersService.remove(id,user);
  }
}
