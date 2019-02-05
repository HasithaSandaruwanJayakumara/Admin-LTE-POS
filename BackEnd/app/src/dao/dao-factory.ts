import {CustomerDAOImpl} from "./custom/impl/customer-dao-impl";
import {PoolConnection} from "mysql";
import {ItemDAOImpl} from "./custom/impl/item-dao-impl";
import {OrderDAOImpl} from "./custom/impl/order-dao-impl";
import {OrderDetailDTO} from "../dto/orderdetails-dto";
import {OrderDetailDAOImpl} from "./custom/impl/orderdetail-dao-impl";

export enum DAOTypes{
    CUSTOMER,ITEM,ORDER,ORDERDETAIL,
}

export function getDAO(daoType: DAOTypes, connection: PoolConnection){
    switch (daoType) {
        case DAOTypes.CUSTOMER:
            return new CustomerDAOImpl(connection);
        case DAOTypes.ITEM:
            return new ItemDAOImpl(connection);
        case DAOTypes.ORDER:
            return new OrderDAOImpl(connection);
        case DAOTypes.ORDERDETAIL:
            return new OrderDetailDAOImpl(connection);
        default:
            return null;
    }
}