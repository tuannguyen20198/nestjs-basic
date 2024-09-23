import { IsEmail,IsMongoId,IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateUserCvDto {

  @IsNotEmpty({
    message:"url không đúng định dạng"
  })
  url:string;

  @IsNotEmpty({
    message:"companyId không được để trống"
  })
  @IsMongoId({
    message:"companyId is a mongo id"
  })
  companyId:mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message:"jobId không được để trống"
  })
  @IsMongoId({
    message:"jobId is a mongo id"
  })
  jobId:mongoose.Schema.Types.ObjectId;
}
