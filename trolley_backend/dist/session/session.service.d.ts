/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { CreateSessionDto, PaymentDto } from "src/dto/session.dto";
import { Session } from "src/schema/session.schema";
export declare class SessionService {
    private sessionModel;
    constructor(sessionModel: Model<Session>);
    createRazorpay(request: PaymentDto): Promise<{
        id: string;
        amount: string | number;
        currency: string;
    }>;
    create(createSessionDto: any): Promise<import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllSessionDetails(): Promise<(import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getSessionDetailsById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Session, "findOne">;
    editSessionDetailsById(id: string, newData: CreateSessionDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Session, "findOneAndUpdate">;
    deleteSessionDetailsById(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, Session> & Session & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Session, "findOneAndDelete">;
}
