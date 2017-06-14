/// <reference path="adminscript.js" />

app.service("SharedData", ['$http', function () {
    var share = {};
    this.save = function (data) {
        this.share = data;
      

    };

    this.getData = function () {

        if (share !== null) {
            return share;
        }
        else {

            share == null;
            return share;
        }
       

    };


}])