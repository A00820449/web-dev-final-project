import { v4 as uuidv4 } from 'uuid';

export class Todo {
    /**
     * @param {{title: string, description: string}} data 
     */
    constructor(data) {
        if (data.title) {
            this.title = data.title;
        }
        else{
            this.title = "NoTitleErr";
        }
        
        if (data.description){
            this.description = data.description;
        }
        else {
            this.description = '';
        } 
        
        this.timestamp = Date.now();
        this._id = uuidv4();
    }
}