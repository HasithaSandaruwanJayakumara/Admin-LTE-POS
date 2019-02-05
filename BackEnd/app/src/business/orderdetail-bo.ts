
import {pool} from "../db/db-pool";

import {DAOTypes, getDAO} from "../dao/dao-factory";

import Promise=require("promise");
import {OrderDetailDTO} from "../dto/orderdetails-dto";
import {OrderDetailDAO} from "../dao/custom/orderdetail-dao";




export class OrderDetailBO {
    findAllOrderDetails(): Promise<Array<OrderDetailDTO>> {

        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err) {
                    reject(err);
                } else {

                    const orderdetailDAO = <OrderDetailDAO> getDAO(DAOTypes.ORDERDETAIL, connection);

                    const promise = orderdetailDAO.findAll();
                    promise.then(orderdetail => {
                        resolve(orderdetail);
                        pool.releaseConnection(connection);
                    }).catch(error => {
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        })
    }


    findOrderDetail(id: string): Promise<Array<OrderDetailDTO>>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const orderdetailDAO  = <OrderDetailDAO> getDAO(DAOTypes.ORDERDETAIL, connection);

                    const promise = orderdetailDAO.find(id);
                    promise.then(orderdetail => {
                        resolve(orderdetail);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }


    // updateItem(item: ItemDTO): Promise<boolean>{
    //     return new Promise((resolve, reject) => {
    //
    //         pool.getConnection((err, connection) => {
    //
    //             if (err){
    //                 reject(err);
    //             }else{
    //
    //                 const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
    //
    //                 const promise = itemDAO.update(item);
    //                 promise.then(result => {
    //                     resolve(result);
    //                     pool.releaseConnection(connection);
    //                 }).catch(error=>{
    //                     reject(error);
    //                     pool.releaseConnection(connection);
    //                 });
    //
    //             }
    //
    //         });
    //
    //
    //     });
    // }
    //
    // deleteItem(id: string): Promise<boolean>{
    //     return new Promise((resolve, reject) => {
    //
    //         pool.getConnection((err, connection) => {
    //
    //             if (err){
    //                 reject(err);
    //             }else{
    //
    //                 const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
    //
    //                 const promise = itemDAO.delete(id);
    //                 promise.then(result => {
    //                     resolve(result);
    //                     pool.releaseConnection(connection);
    //                 }).catch(error=>{
    //                     reject(error);
    //                     pool.releaseConnection(connection);
    //                 });
    //
    //             }
    //
    //         });
    //
    //
    //     });
    // }


    // countItem():Promise<number>{
    //     return new Promise((resolve,reject)=>{
    //         pool.getConnection((err,connect)=>{
    //             if(err){
    //                 reject(err);
    //             }else{
    //                 const itemDAO =<ItemDAO> getDAO(DAOTypes.ITEM,connect )
    //                 const promise=itemDAO.count();
    //
    //                 promise.then(count=>{
    //                     resolve(count);
    //                 }).catch(err=>{
    //                     reject(err);
    //                 });
    //             }
    //         })
    //     })
    // }


}