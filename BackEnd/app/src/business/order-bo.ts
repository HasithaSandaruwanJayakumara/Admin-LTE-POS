import Promise=require("promise");

import {pool} from "../db/db-pool";
import {DAOTypes, getDAO} from "../dao/dao-factory";
import {OrderDAO} from "../dao/custom/order-dao";


import {Order1DTO} from "../dto/order1-dto";
import {Order} from "../entity/order";
import {OrderDetailDAO} from "../dao/custom/orderdetail-dao";
import {OrderDetail} from "../entity/orderdetails";
import {OrderDTO} from "../dto/order-dto";





export class OrderBO{
    findAllOrders(): Promise<Array<OrderDTO>>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const orderDAO = <OrderDAO> getDAO(DAOTypes.ORDER, connection);

                    const promise = orderDAO.findAll();
                    promise.then(orders => {
                        resolve(orders);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });
        });
    }

    findOrder(id: string): Promise<Array<OrderDTO>>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const orderDAO  = <OrderDAO> getDAO(DAOTypes.ORDER, connection);

                    const promise = orderDAO .find(id);
                    promise.then(order => {
                        resolve(order);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    saveOrder(order1: Order1DTO): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const orderDAO = <OrderDAO> getDAO(DAOTypes.ORDER, connection);
                    const orderdetailDAO = <OrderDetailDAO> getDAO(DAOTypes.ORDERDETAIL, connection);

                    const promise = orderDAO.save(new Order(order1.id,order1.date,order1.customerId));
                    promise.then(result => {


                        for (var orderDetail of order1.orderDetails) {

                            const promise = orderdetailDAO.save(new OrderDetail(orderDetail.orderId,orderDetail.itemCode,orderDetail.qty,orderDetail.unitPrice));
                            promise.then(result => {

                                resolve(result);
                                pool.releaseConnection(connection);

                            }).catch(error=>{
                                reject(error);
                                pool.releaseConnection(connection);
                            });
                        }



                        // resolve(result);
                        pool.releaseConnection(connection);

                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    countOrder():Promise<number>{
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connect)=>{
                if(err){
                    reject(err);
                }else{
                    const orderDAO =<OrderDAO> getDAO(DAOTypes.ORDER,connect )
                    const promise=orderDAO.count();

                    promise.then(count=>{
                        resolve(count);
                    }).catch(err=>{
                        reject(err);
                    });
                }
            })
        })
    }

}