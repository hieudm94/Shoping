var spService = new SanPhamService();
var validation = new Validation();


function getProductList() {
    spService.getProductList()
        .then(function (result) {

            showTable(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })

}

getProductList();

function showTable(mangSP) {
    var content = "";
    var stt = 1;
    mangSP.map(function (sp) {
        content += `
        <tr>
                <td>${stt++}</td>
                <td>${sp.name}</td>
                <td>${Number(sp.price).toLocaleString()}</td>
                <td>${sp.screen}</td>
                <td>${sp.backCamera}</td>
                <td>${sp.frontCamera}</td>
                <td>
                    <img style="width:200px" src="${sp.img}" alt="">
                </td>
                <td>${sp.desc}</td>
                <td>${sp.type}</td>
                <td>
                <button onclick="getProductDetail('${sp.id}')"  data-toggle="modal" data-target="#myModal" class="btn btn-info">Xem</button>
                <button class="btn btn-danger" onclick="deleteProduct('${sp.id}')" >Xóa</button>
                </td>
        </tr>
        `
    })

    document.querySelector("#tblDanhSachSP").innerHTML = content;

}

function handleForm() {
    document.querySelector("#myModal .modal-footer").innerHTML = `<button class="btn btn-success" onclick="addProduct()" >Add</button>`

    var formELE = document.querySelectorAll("#myModal .form-control");
    for (var i = 0; i < formELE.length; i++) {
        formELE[i].value = "";
        document.querySelector("#spanGiaSP").innerHTML= "";
        document.querySelector("#spankichThuocSP").innerHTML= "";
        document.querySelector("#spancameraB").innerHTML= "";
        document.querySelector("#spancameraF").innerHTML= "";
        document.querySelector("#spanHinhSP").innerHTML= "";
        document.querySelector("#spanmoTaSP").innerHTML= "";
        document.querySelector("#spanhangSP").innerHTML= "";
        document.querySelector("#spanTenSP").innerHTML= "";
    }
}

document.querySelector("#btnThemSP").onclick = handleForm;

function addProduct() {
    var name = document.querySelector("#TenSP").value;
    var price = document.querySelector("#GiaSP").value;
    var screen = document.querySelector("#kichThuocSP").value;
    var backCamera = document.querySelector("#cameraB").value;
    var frontCamera = document.querySelector("#cameraF").value;
    var img = document.querySelector("#HinhSP").value;
    var desc = document.querySelector("#moTaSP").value;
    var type = document.querySelector("#hangSP").value;


    var isValid = true;
    // tên sản phẩm
    isValid &= validation.checkEmpty(name,"spanTenSP","Tên sản phẩm không được để trống");
    // Giá sản phẩm
    isValid &= validation.checkEmpty(price,"spanGiaSP","Giá sản phẩm không được để trống") && validation.checkPrice(price,"spanGiaSP","Giá sản phẩm phải là chữ số");

    // Kích thước màng hình
    isValid &= validation.checkEmpty(screen,"spankichThuocSP","Kích thước màng hình không được để trống");

    // Camera sau
    isValid &= validation.checkEmpty(backCamera,"spancameraB","Camera sau không được để trống");

    // Camera trước
    isValid &= validation.checkEmpty(frontCamera,"spancameraF","Camera trước không được để trống");

    // Hình ảnh
   isValid &= validation.checkEmpty(img,"spanHinhSP","Hình ảnh sản phẩm không được để trống");

    // Mô tả
    isValid &= validation.checkEmpty(desc,"spanmoTaSP","Mô tả sản phẩm không được để trống");

    // Hãng 
    isValid &= validation.checkEmpty(type,"spanhangSP","Hãng sản phẩm không được để trống");

   
    if(isValid){
        var sp = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type)
        console.log(TenSP)
    spService.addProduct(sp)
        .then(function (result) {
            getProductList();
            document.querySelector("#myModal .close").click();
            resetForm();
        

        })
        .catch(function (error) {

        });
    }
}

function deleteProduct(id) {
    spService.deleteProduct(id).then(function (result) {
        console.log(result)
        getProductList();
    }).catch(function (error) {
        console.log(error)
    })
}

function getProductDetail(id) {
    console.log(id);
    spService.getProductDetail(id)
        .then(function (result) {
            resetForm();

            console.log(result.data)
            document.querySelector("#TenSP").value = result.data.name;
            document.querySelector("#GiaSP").value = result.data.price;
            document.querySelector("#kichThuocSP").value = result.data.screen;
            document.querySelector("#cameraB").value = result.data.backCamera;
            document.querySelector("#cameraF").value = result.data.frontCamera;
            document.querySelector("#HinhSP").value = result.data.img;
            document.querySelector("#moTaSP").value = result.data.desc;
            document.querySelector("#hangSP").value = result.data.type;



            document.querySelector("#myModal .modal-footer").innerHTML = `
    <button class="btn btn-primary" onclick="updateProduct('${result.data.id}')"  >Update</button>
`;
        }).catch(function (error) {

        })
}

function resetForm(){
    document.querySelector("#spanTenSP").innerHTML= "";
    document.querySelector("#spanGiaSP").innerHTML= "";
    document.querySelector("#spankichThuocSP").innerHTML= "";
    document.querySelector("#spancameraB").innerHTML= "";
    document.querySelector("#spancameraF").innerHTML= "";
    document.querySelector("#spanHinhSP").innerHTML= "";
    document.querySelector("#spanmoTaSP").innerHTML= "";
    document.querySelector("#spanhangSP").innerHTML= "";

}

function updateProduct(id) {
    var name = document.querySelector("#TenSP").value;
    var price = document.querySelector("#GiaSP").value;
    var screen = document.querySelector("#kichThuocSP").value;
    var backCamera = document.querySelector("#cameraB").value;
    var frontCamera = document.querySelector("#cameraF").value;
    var img = document.querySelector("#HinhSP").value;
    var desc = document.querySelector("#moTaSP").value;
    var type = document.querySelector("#hangSP").value;

    var spUpdate = new SanPham(name, price, screen, backCamera, frontCamera, img, desc, type);

    spService.updateProduct(id,spUpdate).then(function (result){

        console.log(result)
        document.querySelector("#myModal .close").click();
        getProductList();
    }).catch(function (error) {

    })
}