import {CustomerDTO} from "../dto/customer-dto";
import {pool} from "../db/db-pool";
import {CustomerDAO} from "../dao/custom/customer-dao";
import {DAOTypes, getDAO} from "../dao/dao-factory";
import {ItemDTO} from "../dto/item-dto";
import Promise = require("promise");
import {ItemDAO} from "../dao/custom/item-dao";


export class ItemBo{

    findAllItems(): Promise<Array<ItemDTO>>{

        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                   // const itemDAO = <ItemDAO>getDAO(DAOTypes.ITEM, connection);

                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);

                    const promise = itemDAO.findAll();
                    promise.then(items => {
                        resolve(items);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });

    }
    countItem():Promise<number>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                }else {
                    const itemDAO =<ItemDAO> getDAO(DAOTypes.ITEM,connection );
                    const promise = itemDAO.count();

                    promise.then(count=>{
                        resolve(count);
                    }).catch(err=>{
                        reject(err);
                    });
                }
            })
        })
    }


    findItems(code: string): Promise<Array<ItemDTO>>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);

                    const promise = itemDAO.find(code);
                    promise.then(item => {
                        resolve(item);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    saveItem(item:ItemDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);

                    const promise = itemDAO.save(item);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    updateItem(item: ItemDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);

                    const promise = itemDAO.update(item);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    deleteItem(code: string): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);

                    const promise = itemDAO.delete(code);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

}