export declare class Product {
    product_name: string;
    product_price?: string;
}
export declare class UserDetails {
    name: string;
    email: string;
    phonenumbe: string;
}
export declare class PaymentDto {
    amount: number;
    currency: string;
}
export declare class CreateSessionDto {
    status: string;
    payment_id: string;
    session_id: string;
    user: UserDetails;
    products: Product[];
}
