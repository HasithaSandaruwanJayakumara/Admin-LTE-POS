import {OrderDetailDTO} from "./orderdetails-dto";

export class Order1DTO{
    constructor(public id:string,public date:string,public customerId:string,public orderDetails:Array<OrderDetailDTO>){};
}