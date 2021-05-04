sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(Controller, JSONModel, Device) {
	"use strict";

	return Controller.extend("myshopsap.controller.Map", {

		onInit: function () {
			// set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		},

		onPressResize: function ()	{
			if (this.byId("btnResize").getTooltip() == "Minimize") {
				if (Device.system.phone) {
					this.byId("vbi").minimize(132, 56, 1320, 560);//Height: 3,5 rem; Width: 8,25 rem
				} else {
					this.byId("vbi").minimize(168, 72, 1680, 720);//Height: 4,5 rem; Width: 10,5 rem
				}
				this.byId("btnResize").setTooltip("Maximize");
			} else {
				this.byId("vbi").maximize();
				this.byId("btnResize").setTooltip("Minimize");
			}
        },
        
        initMap: function ()	{
            var mapOptions = {
			zoom: 3,
			center: new google.maps.LatLng(37.5, -122),
			mapTypeId: 'roadmap'
		};
		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        }

	});

});