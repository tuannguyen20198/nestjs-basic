import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
<<<<<<< HEAD
import { ResponseMessage, User } from 'src/decorator/customize';
=======
import { ResponseMessage, SkipCheckPermission, User } from 'src/decorator/customize';
>>>>>>> 213ab8fd9cd5ed82b848e4105a789ef7147a5af3
import { IUser } from 'src/users/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @Post()
  @ResponseMessage("Create a subscriber")
  create(@Body() createSubscriberDto: CreateSubscriberDto, @User() user: IUser) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post("skills")
  @ResponseMessage("Get subscriber's skills")
<<<<<<< HEAD
=======
  @SkipCheckPermission()
>>>>>>> 213ab8fd9cd5ed82b848e4105a789ef7147a5af3
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }



  @Get()
  @ResponseMessage("Fetch subscribers with paginate")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch subscriber by id")
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
<<<<<<< HEAD
=======
  @SkipCheckPermission()
>>>>>>> 213ab8fd9cd5ed82b848e4105a789ef7147a5af3
  @ResponseMessage("Update a subscriber")
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    return this.subscribersService.update(id, updateSubscriberDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete a subscriber")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
