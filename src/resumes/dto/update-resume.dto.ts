import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto, CreateUserCvDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {}
