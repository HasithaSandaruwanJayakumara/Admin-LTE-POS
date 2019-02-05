import {SuperDAO} from "./super-dao";
import {SuperEntity} from "../entity/super-entity";

export interface CrudDAO<T extends SuperEntity, ID> extends SuperDAO{

    findAll(): Promise<Array<T>>;

    find(id: ID): Promise<Array<T>>;


    save(entity: T): Promise<boolean>;


    // update(entity: T): Promise<boolean>;
    //
    //
    // delete(id: ID): Promise<boolean>;
}
