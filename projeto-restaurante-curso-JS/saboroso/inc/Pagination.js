let conn = require("./db");

class Pagination {

    constructor(
        query,
        params = [],
        itensPerPage = 10
    ){
        
        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;

    }
    
    getPage(page){

        this.currentPage = page -1;

        this.params.push(
            this.currentPage * this.itensPerPage, 
            this.itensPerPage
        );


        return new Promise ((resolve, reject) =>{

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(";"), this.params, (err, results) => {

                if(err){
                    reject(err);
                }else{
                    
                    this.data = results[0];
                    this.total = results [1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total/this.itensPerPage);//Math.ceil sempre arredonda pra cima
                    this.currentPage++;

                    resolve(this.data);
                }

            });

        });

    }

    getTotal(){
        return this.total;
    }

    getCurrentPage(){
        return this.currentPage;
    }

    getTotalPage(){
        return this.totalPages;
    }

    getNavigation(params){
        
        let limitPagesNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;
      
        if(this.getTotalPage() < limitPagesNav){
            limitPagesNav = this.getTotalPage();
        }

        //Primeiras paginas
        if((this.getCurrentPage() - parseInt(limitPagesNav/2)) < 1){
            nrstart = 1;
            nrend = limitPagesNav;
        }
        //Ultimas paginas
        else if((this.getCurrentPage() + parseInt(limitPagesNav/1)) > this.getTotalPage()){
            nrstart = this.getTotalPage() - limitPagesNav;
            nrend = this.getTotalPage();
        }else{
            nrstart = this.getCurrentPage() - parseInt(limitPagesNav/2);
            nrend = this.getCurrentPage() + parseInt(limitPagesNav/2);
        }

        if(this.getCurrentPage() > 1){
            links.push({
                text: '<',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentPage()-1}))                
            });
        }

        for(let x = nrstart; x <= nrend; x++){

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: x})),
                active: (x=== this.getCurrentPage())
            });

        }

        if(this.getCurrentPage() < this.getTotalPage()){
            links.push({
                text: '>',
                href: '?' + this.getQueryString(Object.assign({}, params, {page: this.getCurrentPage()+1}))                
            });
        }

        return links;

    }

    getQueryString(params){

        let queryString = [];

        for (let name in params){

            queryString.push(`${name}=${params[name]}`);

        }

        return queryString.join("&");

    }

}

module.exports = Pagination;