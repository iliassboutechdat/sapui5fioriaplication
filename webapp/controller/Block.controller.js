sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/layout/library"
], function (Controller, JSONModel, layoutLibrary, Device) {
	"use strict";

	var CellColorShade = layoutLibrary.BlockLayoutCellColorShade;

	return Controller.extend("myshopsap.controller.Block", {

		onInit: function () {
			var oView = this.getView(),
                oModel = new JSONModel(),
                oDeviceModel = new JSONModel(Device);

			oView.setModel(oModel);
            this._fillModel(this._modelData);
            oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
            
		},

		_modelData: {
			selectEnabled: true,
			colorSet: "ColorSet5",
			shades: [
				CellColorShade.ShadeA,
				CellColorShade.ShadeB,
				CellColorShade.ShadeC,
				CellColorShade.ShadeD,
				CellColorShade.ShadeE,
				CellColorShade.ShadeF

			],
			contrastCells: []
		},

		_fillModel: function (oData) {
			var oModel = this.getView().getModel();
			oModel.setData(oData);
		},

		handleChecked: function (oEvent) {
			var bChecked = oEvent.getParameter("selected");

			if (bChecked) {
				this._fillModel(this._modelData);
			} else {
				this._modelData = this.getView().getModel().getData();
				this._fillModel({ selectEnabled: false });
			}
		},

		handleContrastCellSelection: function (oEvent) {
			var oView = this.getView(),
				oItem = oEvent.getParameter("changedItem"),
				bSelected = oEvent.getParameter("selected"),
				oBLCell = oView.byId(oItem.getKey());

			if (!oBLCell) {
				return;
			}

			if (bSelected) {
				oBLCell.addStyleClass("sapContrast").addStyleClass("sapContrastPlus");
			} else {
				oBLCell.removeStyleClass("sapContrast").removeStyleClass("sapContrastPlus");
			}
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
		}

	});
});