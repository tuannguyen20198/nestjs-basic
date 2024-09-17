import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) 
    private userModel: SoftDeleteModel<JobDocument>
    
  ) {}
  async create(createJobDto:CreateJobDto,@User() user:IUser){
    const {name,skills,company,salary,quantity,level,description,startDate,endDate,isActive} = createJobDto;

    const newUser = this.userModel.create({
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

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
