import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, Patch, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { SessionService } from "./session.service";
import mongoose from "mongoose";
import { CreateSessionDto, PaymentDto } from "src/dto/session.dto";
import { Session } from "src/schema/session.schema";
import { v4 as uuidv4 } from 'uuid'


@Controller('session')
export class SessionController{
    constructor(private readonly sessionService : SessionService){}

    @Post('/create-razorpay-order')
    async createPayment(@Body() request : PaymentDto){
        return this.sessionService.createRazorpay(request)
    }

    @Post()
    @UsePipes (new ValidationPipe())
    async createSession(@Body() createSessionDto: CreateSessionDto){ 
        console.log(uuidv4()) 
        const newproduct = await this.sessionService.create(createSessionDto)
        return newproduct
    }

    @Get()
    async getAllSession() {
        const allSession = this.sessionService.getAllSessionDetails()
        console.log('allsession',allSession)
        return allSession
    }

    @Get(':id')
    async getSessionById(@Param('id') id: string):Promise<Session | undefined>{
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) throw new HttpException('Invalid Id',400)
        const getSession = await this.sessionService.getSessionDetailsById(id)
        if (!getSession) {
            throw new HttpException('session does not exist!',400);
          } else {
            return getSession;
          }
    }

    @Patch(':id')
    @UsePipes (new ValidationPipe())
    async editSessionById(@Param('id') id : string , @Body() newData:CreateSessionDto){
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if(!isValid) throw new HttpException('Invalid Id',400)
        const updatedSession = await this.sessionService.editSessionDetailsById(id,newData) 
        if(!updatedSession) throw new HttpException('session not found', 404)
        return updatedSession   
    }

    @Delete(':id')
    async deleteSession(@Param('id') id: string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Invalid Id',400)
        const deletedSession =await this.sessionService.deleteSessionDetailsById(id)
        if(!deletedSession)  throw new HttpException('session not found', 404)
        return deletedSession      
    }
}

