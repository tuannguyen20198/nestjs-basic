import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel:SoftDeleteModel<SubscriberDocument>
  ){}
  async create(createSubscriberDto: CreateSubscriberDto,user:IUser) {
    const {name,email,skills} = createSubscriberDto;
    const isExist = await this.subscriberModel.findOne({email})
    if (isExist) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống.Vui lòng nhập email khác`)
    }
    let newSubs = await this.subscriberModel.create({
      name,email,skills,
      createdBy:{
        _id:user._id,
        email:user.email
      }
    })
    return {
      _id:newSubs?._id,
      createdBy:newSubs?.createdBy
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.subscriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.subscriberModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  }

 async findOne(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) 
    return `not found subscribers`;
    return await this.subscriberModel.findOne({
      _id:id
    })
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
