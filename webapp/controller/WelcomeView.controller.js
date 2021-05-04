sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/layout/library"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("myshopsap.controller.WelcomeView", {

		onInit: function () {
			var oImgModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/img.json"));
            this.getView().setModel(oImgModel, "img");
            
        
        }
})
});
