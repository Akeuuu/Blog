import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    firstName!: string;

    @Prop()
    LastName!: string;

    @Prop({ required: true })
    pseudo!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true, select: false })
    password!: string;

}

export const UserSchema = SchemaFactory.createForClass(User);