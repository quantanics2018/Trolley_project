import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class Product {
    product_name: string;
    product_price?: string   
}

export class UserDetails {
    name: string;
    email?: string
    phonenumber?: string  
}

@Schema()
export class Session {

    @Prop({required:true})
    status : string
 
    @Prop({required:true})
    payment_id : string

    @Prop({required:true})
    session_id : string

    @Prop({required:true})
    user?: UserDetails;
    
    @Prop({required:true})
    products?: Product[];

}

export const SessionSchema = SchemaFactory.createForClass(Session)