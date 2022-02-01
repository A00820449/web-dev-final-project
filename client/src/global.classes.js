export class Todo {
    /**
     * @param {{title: string, description: string}} data 
     */
    constructor(data) {
        if (data.title)
            this.title = data.title;
        else
            this.title = "NoTitleErr";
        
        if (data.description)
            this.description = data.description;
        else
            this.description = '';
    }
}