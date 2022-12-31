function ProductService() {
    this.getProductList = function () {
        var promise = axios({
            method: 'GET',
            url: 'https://62e74afa0e5d74566af18d43.mockapi.io/ProductsCapstone',
        });
        return promise;
    }


}





