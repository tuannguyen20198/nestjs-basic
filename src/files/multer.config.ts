import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from "fs"
import { diskStorage } from "multer";
import path, { basename, join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    getRootPath = () => {
        return process.cwd();
    }

    ensureExists(targetDirectory:string){
        fs.mkdir(targetDirectory,{recursive:true},(error)=>{
            if (!error) {
                console.log('Directory successfully created, or it already exists.');
                return;
            }
            switch (error.code) {
                case 'EXIST':
                    //Error:
                    //Requested location aldready exists, but it's not a directory.
                    break;
                case 'ENOTDIR':
                    //Error:
                    //The parent hirearchy contains a file with the same name
                    break;
                default:
                    console.error(error);
                    break;
            }
        })
    }

    createMulterOptions():MulterModuleOptions{
        return{
            storage:diskStorage({
                destination:(req,file,cb)=>{
                    const folder = req?.headers?.folder_type ?? "default";
                    this.ensureExists(`public/images/${folder}`);
                    cb(null,join(this.getRootPath(),`public/images/${folder}`))
                },
                filename:(req,file,cb) =>{
                    //get image extension
                    let extName = path.extname(file.originalname);

                    //get images's name (without extension)
                    let basename = path.basename(file.originalname,extName);
                    
                    let finalName = `${basename} - ${Date.now()}${extName}}`
                    cb(null,finalName)
                }
            })
        }
    }
}