import {Customer} from "../../entity/customer";
import {promises} from "fs";

export interface CustomerDAO extends SuperDAO<Customer,string>{

    count():Promise<number>;

}