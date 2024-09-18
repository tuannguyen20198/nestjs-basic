import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) 
    private jobModel: SoftDeleteModel<JobDocument>
    
  ) {}
  async create(createJobDto:CreateJobDto,@User() user:IUser){
    const {name,skills,company,salary,quantity,level,description,startDate,endDate,isActive} = createJobDto;

    const newUser = this.jobModel.create({
      name,skills,
      company,salary,
      quantity,level,
      description,startDate,
      endDate,isActive,
      createdBy:{
        _id:user._id,
        email:user.email
      }
    })
    return newUser
  }

  async findAll(currentPage :number,limit:number,qs:string) {
    const { filter, sort, population } = aqp(qs);
    
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobModel.find(filter)
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

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id:string,updateJobDto: UpdateJobDto,@User() user:IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `not found user`;
    const findJob =await this.jobModel.findOne({
      _id:id
    })
    if (findJob) {
      const updateJob = await this.jobModel.updateMany({
        ...updateJobDto,
        createdBy:{
          _id:user._id,
          email:user.email
        }
      })
      return updateJob;
    }
  }

  async remove(id: string,user:IUser) {
    await this.jobModel.updateOne(
      {_id:id},
      {
        deletedBy:{
          _id:user._id,
          email:user.email
        },
      }
    );
    return this.jobModel.softDelete({
      _id:id
    })
  }
}
