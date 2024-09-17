import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmail,IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsNotEmpty()
    _id:mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    name:string;
}
export class CreateJobDto {

  @IsNotEmpty({
    message:"Name không đúng định dạng"
  })
  name:string;

  @IsNotEmpty({
    message:"Skills không được để trống"
  })
  @IsArray()
  skills: string;

  @IsNotEmpty({
    message:"Location không được để trống"
  })
  location: string;

  @IsNotEmpty({
    message:"Salary không được để trống"
  })
  salary: number;

  @IsNotEmpty({
    message:"Quantity không được để trống"
  })
  quantity: number;

  @IsNotEmpty({
    message:"Level không được để trống"
  })
  level: string;

  @IsNotEmpty({
    message:"Description không được để trống"
  })
  description: string;

  @IsNotEmpty({
    message:"StartDate không được để trống"
  })
  @IsDate()
  startDate: Date;

  @IsNotEmpty({
    message:"EndDate không được để trống"
  })
  @IsDate()
  endDate: Date;

  isActive: boolean;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() =>Company)
  company!:Company
}
