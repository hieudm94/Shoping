function Validation() {
    this.checkEmpty = function(inputVal, spanID, message) {
        if (inputVal.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkName = function (inputVal, spanID, message) {
        var pattern = "^[A-Z a-z]+$"
        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkPrice = function (inputVal, spanID, message) {
        var pattern = /^[0-9]+$/;
        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    this.checkText = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/


        if (inputVal.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message
        document.getElementById(spanID).style.display = "block";
        return false;
    }




}