import { IsEmail,IsNotEmpty } from "class-validator";

export class CreateUserDto {

  @IsEmail({},{
    message:"Name không đúng định dạng"
  })
  name:string;

  @IsEmail({},{
    message:"Address không đúng định dạng"
  })
  address:string;

  @IsEmail({},{
    message:"Description không đúng định dạng"
  })
  description:string;

}
