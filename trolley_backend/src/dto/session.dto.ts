import { IsArray, IsNumber, IsObject, IsString } from "class-validator";

export class Product {
    @IsString()
    product_name: string;

    @IsString()
    product_price?: string   
}

export class UserDetails {
    @IsString()
    name: string;

    @IsString()
    email: string

    @IsString()
    phonenumbe: string  
}

export class PaymentDto {
    @IsNumber()
    amount :number

    @IsString()
    currency: string
}


export class CreateSessionDto{

    @IsString()
    status : string

    @IsString()
    payment_id : string

    @IsString()
    session_id : string

    @IsObject()
    user: UserDetails;

    @IsArray()
    products: Product[];

}
