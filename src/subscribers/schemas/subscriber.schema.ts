import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type SubscriberDocument = HydratedDocument<Subscriber>;

export class Subscriber {
    @Prop({required:true})
    email:string;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    skills:string[];

    @Prop({type:Object})
    createdBy:{
        _id:mongoose.Schema.Types.ObjectId;
        email:string;
    }

}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
