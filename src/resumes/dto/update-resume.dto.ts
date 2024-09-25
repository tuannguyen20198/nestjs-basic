import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCvDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateUserCvDto) {}
