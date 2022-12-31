function SanPhamService(){

    this.getProductList = function(){
        return axios({
            method: 'get',
            url:'https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone',
        })
    }

    this.addProduct = function(sp){
        console.log("add service",sp);
        return axios({
            method: 'POST',
            url: 'https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone',
            data: sp
          });
    }

    this.deleteProduct = function(id){
        console.log("id xóa", id);
        return axios({
            method: 'DELETE',
            url: `https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone/${id}`,
          });
    }

    this.getProductDetail = function(id){
        return axios({
            method: 'GET',
            url:`https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone/${id}`,
        })
    }

    this.updateProduct = function(id,sp){
        return axios({
            method: 'PUT',
            url: `https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone/${id}`,
            data: sp
          });
    }





}