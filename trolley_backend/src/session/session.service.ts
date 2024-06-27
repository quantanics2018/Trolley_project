import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSessionDto, PaymentDto } from "src/dto/session.dto";
import { Session } from "src/schema/session.schema";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class SessionService{

  constructor(
    @InjectModel(Session.name) private sessionModel : Model<Session>,
   ){}

    async createRazorpay(request:PaymentDto){
      console.log('hello')
      const razorpayInstance = new Razorpay({
        key_id:'rzp_test_0MsloSAqW3knPj',
        key_secret: "ePKlU8Hq8PUqSGHAvHNO0iir"
      });
      try {
    
        const options = {
          amount: request.amount,
          currency: request.currency,
          receipt: `or_${uuidv4()}`,
          payment_capture: 1 
        };
    
        const order = await razorpayInstance.orders.create(options);
        return { id: order.id, amount: order.amount, currency: order.currency };
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw new ServiceUnavailableException('Error creating Razorpay order');
      }
    }


      async create(createSessionDto : any){
       try{ 
            const sesssion   = new this.sessionModel(createSessionDto)  
            return sesssion.save(); 
        } catch(error){
          console.log(error)
          throw new ServiceUnavailableException(`Unable to create session data : ${error}`)
        }       
      }

      async getAllSessionDetails(){
        const allitems = await this.sessionModel.find()
        console.log('allsession',allitems)
        return allitems
      }

      getSessionDetailsById(id:string){
        const returnproduct = this.sessionModel.findById(id)
        return returnproduct
      }
      editSessionDetailsById(id: string, newData: CreateSessionDto){
        const updatedproduct =this.sessionModel.findByIdAndUpdate(id,newData,{new:true});
        return updatedproduct
    
      }
      deleteSessionDetailsById(id:string){
        return this.sessionModel.findByIdAndDelete(id)
      }
}   
