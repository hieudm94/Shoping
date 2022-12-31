var cart = [];

var spService = new ProductService();

var buttonsDOM = [];

class UI {
    //! phương thức hiển thị sản phẩm 
    displayProducts(products) {
        var content = '';
        products.forEach(function (product) {
            content += `
    <div class="col-3">
        <img class="product_img" src="${product.img}" width="80%">
        <h2 class="product_name">${product.name}</h2>
        <p>${product.screen}</p>
        <p>${product.backCamera}</p>
        <p>${product.frontCamera}</p>
        <p>${product.desc}</p>
        <p>$ ${product.price}</p>
        <button class="btn_them" data-id=${product.id}>Thêm vào giỏ hàng</button>
    </div>
    </div>
    `;
        })
        document.querySelector('.products').innerHTML = content;
    }

    //! Phương thức nhấn button
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.btn_them')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {

                button.innerText = "Đã thêm vào giỏ hàng";
                button.disabled = true;

                this.setCartValues(cart)
                this.addCartItem(inCart)


                const pAmountArray = [...document.querySelectorAll('.item-amount')];
                pAmountArray.forEach(pAmount => {
                    let idAmount = pAmount.dataset.id;
                    let inCart1 = cart.find(item => item.id === idAmount);
     
                    if (inCart1) {
                        pAmount.innerText = inCart1.amount
                    }
                })


            }
            button.addEventListener('click', (event) => {
                event.target.innerText = "Đã thêm vào giỏ hàng";
                event.target.disabled = true;
                let cartItem = { ...Storage.getProduct(id), amount: 1 };

                // add product to the cart
                cart = [...cart, cartItem]
     

                // set cart values
                this.setCartValues(cart)

                // display cart item
                this.addCartItem(cartItem)
                Storage.saveCart(cart);
            })
        })
    }

    //! phương thức setCartValues
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        document.querySelector('.price-total span').innerText = tempTotal;
        document.querySelector('.total-qty').innerText = itemsTotal;

    }

    //! phương thức addCartItem
    addCartItem(item) {
        const addtr = document.createElement('tr');
        addtr.innerHTML = `
        <tr>
        <td style="align-items: center;"><img
            src="${item.img}" alt=""
            width="70px"><span class="product_name_td">${item.name}</span></td>
        <td>
          <p>$<span class="product_price">${item.price}</span></p>
        </td>

        <td><button class="btn-amount" type="button"><i class="fas fa-chevron-left" data-id=${item.id}></i></button>
        <p class="item-amount" style="display: inline-block;" data-id=${item.id}>1</p>
        <button class="btn-amount" type="button"><i class="fas fa-chevron-right" data-id=${item.id}></i></button> </td>

        <td class="xoaSP" data-id=${item.id} style="cursor: pointer;">Xóa</td>
      </tr>
        `
        let cartTable = document.querySelector('tbody');
        cartTable.appendChild(addtr);
    }

    cartLogic() {

        document.querySelector('.clearCart').addEventListener('click', () => {
            this.clearCart();
            this.setCartValues(cart)
            Storage.saveCart(cart);
        });

        let cartTable = document.querySelector('tbody');
        cartTable.addEventListener('click', event => {

            if (event.target.classList.contains('xoaSP')) {
                let removeItem = event.target;

                let id = removeItem.dataset.id;
                cartTable.removeChild(removeItem.parentElement);
                this.removeItem(id);
                this.setCartValues(cart)
                Storage.saveCart(cart)
            }
            else if (event.target.classList.contains('fa-chevron-right')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                this.setCartValues(cart)
                //DOM tới thẻ p hiển thị dữ liệu
                addAmount.parentElement.previousElementSibling.innerText = tempItem.amount;
                Storage.saveCart(cart)
            }
            else if (event.target.classList.contains('fa-chevron-left')) {
                let subAmount = event.target;
                let id = subAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    this.setCartValues(cart)
                    subAmount.parentElement.nextElementSibling.innerText = tempItem.amount;
                    Storage.saveCart(cart)
                } else {
                    let cartTable = document.querySelector('tbody');
                    // cartTable remove thẻ tr
                    cartTable.removeChild(subAmount.parentElement.parentElement.parentElement);
                    this.removeItem(id);
                    this.setCartValues(cart)
                    Storage.saveCart(cart)
                }
            }
        }
        )


        //! Làm nút thanh toán
        document.querySelector('.thanhToan').onclick = () => {

            this.clearCart();
            this.setCartValues(cart)
            Storage.saveCart(cart)
            document.querySelector('.overlay').style.display = "none"
            document.querySelector('.cart').style.right = "-100%";
        }
    }

    //! xóa sp
    clearCart() {

        let cartItems = cart.map(item => item.id);

        cartItems.forEach(id => this.removeItem(id))

        let cartTable = document.querySelector('tbody');


        while (cartTable.children.length > 0) {
            cartTable.removeChild(cartTable.children[0]);
        }
    }
    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `Thêm vào giỏ hàng`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }

}


const ui = new UI();

//! local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("productListCapstone", JSON.stringify(products));
    }
    static getProduct(id) {
        // lấy dữ liệu tên 'productListCapstone' dưới local lên và parse từ JSON sang array gán vào biến tên products (let products). 
        if (localStorage.getItem('productListCapstone') != undefined) {
            let products = JSON.parse(localStorage.getItem('productListCapstone'));
            return products.find(product => product.id === id);
        }

        // duyệt mảng products lấy ra product có id trùng với id truyền vào từ tham số
    }
    static saveCart(cart) {
        localStorage.setItem("cartCapstone", JSON.stringify(cart));
    }
    static getCart() {
        if (localStorage.getItem('cartCapstone')) {
            let cart = JSON.parse(localStorage.getItem('cartCapstone'));
            return cart;
        } else { return [] }
    }
}



//! Load sp từ AXIOS
spService.getProductList().then(function (result) {
    // thành công
    // console.log(result.data)
    ui.displayProducts(result.data);
    Storage.saveProducts(result.data);

    cart = Storage.getCart()

    ui.getBagButtons();
    ui.cartLogic();

}).catch(function (error) {
    // thất bại
    alert('Có lỗi', error);
});



//! cart show-close
let cartShow = document.querySelector('.fa-shopping-cart');
let cartClose = document.querySelector('.fa-times');
cartShow.addEventListener('click', function () {
    document.querySelector('.cart').style.right = "0";
    document.querySelector('.overlay').style.display = "block"
})
cartClose.addEventListener('click', function () {
    document.querySelector('.overlay').style.display = "none"
    document.querySelector('.cart').style.right = "-100%";
})
document.querySelector('.overlay').onclick = () => {
    document.querySelector('.overlay').style.display = "none"
    document.querySelector('.cart').style.right = "-100%";
}