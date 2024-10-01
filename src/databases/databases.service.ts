import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User } from 'src/decorator/customize';
import { Permission, PermissionDocument } from 'src/permissions/schemas/permission.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DatabasesService implements OnModuleInit{
    constructor(
        @InjectModel(User.name)
        private userModel:SoftDeleteModel<UserDocument>,

        @InjectModel(Permission.name)
        private permissionModel:SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel:SoftDeleteModel<RoleDocument>,

        private configService:ConfigService,
        private userService:UsersService
    ){}
    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT");
        if (Boolean(isInit)) {
            const countUser = await this.userModel.count({})
            const countPermission = await this.userModel.count({})
            const countRole = await this.userModel.count({})
        }
        console.log(`The module has been initialized.`);
    }
}
