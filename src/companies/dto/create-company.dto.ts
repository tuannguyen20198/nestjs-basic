import { IsEmail,IsNotEmpty } from "class-validator";

export class CreateCompanyDto {

  @IsNotEmpty({
    message:"Name không đúng định dạng1"
  })
  name:string;

  @IsNotEmpty({
    message:"Email không được để trống"
  })
  address: string;

  @IsNotEmpty({
    message:"Description không được để trống"
  })
  description:string;

}
