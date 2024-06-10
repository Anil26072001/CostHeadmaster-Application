
var GlobleVariable = {
    CostHeadName: "#costheadname",
    CostnameError: "#costnameError", 
    CostErrorIcons: "#costErrorIcons",
    CostIcon: "#costicon",
    AddButton:"#addButton",
    Remark: "#remarks",
    IsActive: "#isactive",
    EditIcon: "#editIcon",
    Viewicon :"view-icon",
    Dialogbox: "#dialog-box",
    Deleteicon:"#delete-icon",
    HiddencostId: "#hiddencostId",
    Hiddenfield:  "#hiddenfield",
    Modeid: "#modeid",
    Grid: "#grid",
    KendoGrid: "#kendoGrid",
    AddWindow: "#addWindow",
    Dropdownlist: "#dropdownlist",
    RefreshIcon: "#refreshIcon",
    GridIcon:"#gridIcon",

    ErrorContainer: "#errorContainer",
    Submit: "#submit",
    Close:"#close"

//$(document).ready(function () {
//    var baseid = $("#base").data('base');

};

//    function KendbindData(listapidata) {
//        var dataSource = new kendo.data.DataSource({
//            data: listapidata,
//            pageSize: 10
//        });

//        $("#grid").kendoGrid({
//            dataSource: dataSource,
//            height: 500,
//            scrollable: true,
//            pageable: {
//                buttonCount: 5,
//                numeric: true,
//                refresh: false
//            },
//            filterable: true,


//            toolbar: ["excel", "pdf", "search"],

//            //toolbar: [
//            //    {
//            //        name: "costom",
//            //        tamplate:"<>"


//            //    }
//            //]

//            toolbar: [
//                {
//                    template: "<a href='\\#' class='k-button k-button-icontext' id='addButton'><span class='k-icon k-i-plus'></span></a>"
//                    //template: "<span class='k-icon k-i-plus'></span> Excel",

//                    //name: "excel"
//                },

//                "excel",
//                "pdf",
//                "search"
//            ],






//            pdfExport: function (e) {
//                const width = e.sender.wrapper.width();
//                e.sender.wrapperClone.width(width);
//                e.sender.wrapperClone.addClass('k-clone');
//            },
//            excel: {
//                fileName: "Kendo UI Grid Export.xlsx"
//            },
//            columns: [
//                {
//                    selectable: true,
//                    width: 80,
//                    attributes: {
//                        "class": "checkbox-align"
//                    },
//                    headerAttributes: {
//                        "class": "checkbox-align"
//                    }
//                },
//                {
//                    field: "costId",
//                    title: "Cost ID",
//                    width: 100
//                },
//                {
//                    field: "costHeadName",
//                    title: "Cost Name",
//                    width: 100
//                },
//                {
//                    field: "remarks",
//                    title: "Remarks",
//                    width: 100
//                },
//                {
//                    field: "isActive",
//                    title: "IsActive",
//                    width: 100
//                }


//            ],


//            dataBound: function () {
//                $("#addButton").on("click", function () {

//                    var modal = $("<div id='addModal' class='modal'><div class='modal-content'><h4>Add New Item</h4></div><div class='modal-footer'><a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a><a href='#!' class='waves-effect waves-green btn-flat'>Save</a></div></div>");

//                    $("body").append(modal);
//                    modal.modal();
//                    modal.modal('open');
//                });
//            },




//        });
//    }
//});












var GlobleVariable = {
    CostHeadName: "costheadname",
    costnameError: "costnameError", 
    CostErrorIcons: "#costErrorIcons",
    Remark: "#remark",
    IsActive: "#active"

};




$(document).ready(function () {

    var CheckExpression = true;
    var NumberOfChecked = 0;
 
    $("#txtSearch").on('input', function () {
        var value = $("#txtSearch").val().toLowerCase();
        $("#grid tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });


    var jq = $.noConflict();
    var mode = $(GlobleVariable.Modeid).val();
    
    /*var baseid = $("#base").data('base');*/
    var baseid=$('#base').attr('data-base');
    $(GlobleVariable.CostHeadName).on('input', function () {
        var name = $(GlobleVariable.CostHeadName).val();
        console.log(name)
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(name)) {
            $(GlobleVariable.CostnameError).text("CostHeadName should only contain letters").show();
            $(GlobleVariable.CostErrorIcons).show();
            $(GlobleVariable.ErrorContainer).show();
      
            $(GlobleVariable.CostIcon).show();
            CheckExpression = false;

        } else {
            $(GlobleVariable.CostnameError).hide();
            $(GlobleVariable.CostErrorIcons).hide();
            $(GlobleVariable.ErrorContainer).hide();
            $(GlobleVariable.CostIcon).hide();
            CheckExpression = true;
        }
    });







   /* if (mode == "Listpage") {*/
        ListAjaxcall();
        function ListAjaxcall() {
        var baseid = $('#base').attr('data-base');
            $.ajax({
               
                url: baseid+'/api/CostHeadController/GetCostHead',

                type: "GET",
                success: function (response) {
                    console.log(response);
                    KendbindData(response);
                },
                error: function (xhr, status, error) {
                    alert('Error occurred while retrieving the data');
                    console.error("Ajax error:", status, error);
                }
            });
        
    }

    function KendbindData(listapidata) {
        var dataSource = new kendo.data.DataSource({
            data: listapidata,
            pageSize: 20
        });

        $(GlobleVariable.Grid).kendoGrid({
            dataSource: dataSource,
            height: 500,
            scrollable: true,
            pageable: {
                buttonCount: 5,
                numeric: true,
                refresh: false
            },
            filterable: true,
            //toolbar: [

            //    {
            //        template: "<a href='\\#' class='k-button k-button-icontext' id='addButton'><span class='k-icon k-i-plus' style='color:blue;'></span> </a>"
            //    },
            //    {
            //        template: "<span id='editIcon' class='material-icons toolbar-icon' style='color:blue;'>edit</span>"
            //    },
            //    {
            //        template: "<span id='gridIcon' class='material-icons toolbar-icon' style='color:blue;'>grid_on</span>"
            //    },
            //    {
            //        template: "<span id='deleteIcon' class='material-icons toolbar-icon' style='color:blue;'>delete</span>"
            //    },
            //    {
            //        template: "<span id='refreshIcon' class='material-icons toolbar-icon' style='color:blue;'>refresh</span>"
            //    },

            //    {
            //        template: "<input id='dropdownlist' />"
            //    },
            //    {
            //        template: "<input class='k-textbox' id='gridSearch' style='width: 200px;' placeholder='costheadname' />",
            //        name: "search"
            //    }
             
            //],


                
                "excel",
                "pdf",
                "search"
            ],
            pdfExport: function (e) {
                const width = e.sender.wrapper.width();
                e.sender.wrapperClone.width(width);
                e.sender.wrapperClone.addClass('k-clone');
            },
            excel: {
                fileName: "Kendo UI Grid Export.xlsx"
            },
            columns: [
                {
                    selectable: true,
                    width: 14,
                    attributes: {
                        "class": "checkbox-align"
                    },
                    headerAttributes: {
                        "class": "checkbox-align"
                    }
                },
               
                {
                    field: "costHeadName",
                    title: "Cost Name",
                    width: 100
                },
                {
                    field: "remarks",
                    title: "Remarks",
                    width: 100
                },
                {
                    field: "isActive",
                    title: "IsActive",
                    width: 100
                },
                {
                    width: 99,
                    title: "Action",
                    template: "<span id='curddropdown' data-id='#:costId#' class='material-icons  material-symbols-outlined'>more_vert</span>"
                }
                
            ]

        });



       
        $("#ExportPdfExcel").click(function () {
            $("#dropdownMenu").toggle();
        });


        // Export grid data to Excel (if needed)
        // Export all data to Excel
        $("#exportToExcel").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").data("kendoGrid");
            if (grid) {
                grid.saveAsExcel();
            } else {
                console.error("Grid not found!");
            }
        });





        $(GlobleVariable.Grid).off('click', '.material-symbols-outlined').on('click', '.material-symbols-outlined', function () {
            var id = $(this).data('id');
            $(GlobleVariable.Hiddenfield).attr("value", id);

            var dialog = $(GlobleVariable.Dialogbox);
            var dialogWidth = dialog.outerWidth();
            var dialogHeight = dialog.outerHeight();

            var top = event.pageY - dialogHeight / 2;
            var left = event.pageX - dialogWidth - 10; // Subtracting dialog width and some padding to position left

            dialog.css({
                top: top + "px",
                left: left + "px"
            }).show();
            //  dialog.open();
            event.stopPropagation();


        });




        //refress
        $("#btnRefresh").on("click", function () {
            
            ListAjaxcall();
            $("#Errorheading").text("Success!");
            $("#MessageText").text("Refress  Successfully ").show();
           
        });

       
        $(document).on('click', function () {
            $(GlobleVariable.Dialogbox).hide();
        });

        $(GlobleVariable.Dialogbox).on('click', function (event) {
            
            event.stopPropagation();
        });

        $(GlobleVariable.Dialogbox).on('click', '#close-icon', function () {
            $(GlobleVariable.Dialogbox).hide();
        });



        //dialogbox edit
        
            $(GlobleVariable.Dialogbox).on("click", "#IdValue", function () {


                $(GlobleVariable.ErrorContainer).hide();
                $(GlobleVariable.CostnameError).hide();
                $(GlobleVariable.CostErrorIcons).hide();
                $(GlobleVariable.CostIcon).hide();
                var costid = $(GlobleVariable.Hiddenfield).val();
                popupWindow = $(GlobleVariable.AddWindow).kendoWindow({

                    //width: 800,
                    /*height: 400,*/

                    title: "Edit Cost Head",
                    visible: false,
                    actions: ["Close"]
                }).data("kendoWindow");
                var baseid = $('#base').attr('data-base');
                $(GlobleVariable.Dialogbox).hide();
                $.ajax({
                    /* url: "https://localhost:7125/api/CostHeadController/GetDetailsbyId/" + costid,*/

                    url: baseid +'/api/CostHeadController/GetDetailsbyId/' + costid,
                    type: "Get",
                    success: function (response) {
                        console.log(response);

                        $(GlobleVariable.CostHeadName).val(response.costHeadName).prop("disabled", true);
                        $(GlobleVariable.Remark).val(response.remarks).prop("disabled", false);


                        $(GlobleVariable.IsActive).prop("checked", response.isActive).prop("disabled", false);

                        if (response.isActive == false) {
                            $(GlobleVariable.IsActive).prop("checked", false);
                        }
                        else {
                            $(GlobleVariable.Active).prop("checked", true);
                        }


                        var newTitle = "CostHead: Edit";
                        popupWindow.title(newTitle);
                        $(GlobleVariable.Submit).text("Update");

                        $(GlobleVariable.Submit).show();

                        $(GlobleVariable.Close).show();

                        popupWindow.center();
                        var wrapper = popupWindow.wrapper;
                        var currentTop = wrapper.css("top");
                        var newTop = parseFloat(currentTop) - 80; // Adjust the value to move it upwards
                        wrapper.css({ top: newTop + "px" });


                        popupWindow.open();

                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching cost head:", error);
                    }

                });
            });
            $(GlobleVariable.Dialogbox).on("click", "#EditButton", function () {
                // Show or hide the buttons based on the action
                $("#updateButton").hide();
                $("#cancelButton").hide();

            });



        //edittoolbar
       // $(GlobleVariable.EditIcon).on("click", function () {
       //     var costid = $(GlobleVariable.HiddencostId).val();

       //     if (costid == '') {

       //         alert("Please Select reacord");
       //     }
       //     else {      
           
       //             var popupWindow = $(GlobleVariable.AddWindow).kendoWindow({
       //                 width: "300px",
       //                 title: "editpage",
       //                 /*  height: "300",*/
       //                 height: "200px",
       //                 visible: false,
       //                 actions: ["Close"]

       //             }).data("kendoWindow");
       //         var costid = $(GlobleVariable.HiddencostId).val();
       //         var baseid = $('#base').attr('data-base');
       //             $.ajax({
       //                /* url: "https://localhost:7125/api/CostHeadController/GetDetailsbyId/" + costid,*/
       //                 url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,
       //                 type: "GET",
       //                 success: function (response) {
       //                     console.log(response);

       //                     $(GlobleVariable.CostHeadName).val(response.costHeadName).prop("disabled", true);
       //                     $(GlobleVariable.Remark).val(response.remarks).prop("disabled", false);
       //                     $(GlobleVariable.IsActive).prop("disabled", false).addClass("disabled-checkbox");
       //                     $(GlobleVariable.Hiddenfield).attr("value", costid);
       //                     $(GlobleVariable.ErrorContainer).hide();
       //                     $(GlobleVariable.CostnameError).hide();
       //                     $(GlobleVariable.CostErrorIcons).hide();
       //                     $(GlobleVariable.CostIcon).hide();


       //                     var newTitle = "CostHead:Edit";
       //                     popupWindow.title(newTitle);
       //                     /* popupWindow.center();*/
       //                     $(GlobleVariable.Submit).text("Update");
       //                     popupWindow.center().open();
       //                     var wrapper = popupWindow.wrapper;
       //                     var currentTop = wrapper.css("top");
       //                     var newTop = parseFloat(currentTop) - 90; // Adjust the value to move it upwards
       //                     wrapper.css({ top: newTop + "px" });



       //                     window.close();

       //                     $("#Errorheading").text("Success!");
       //                     $("#MessageText").text("CostHead Updated Successfully ").show();
       //                     $("#Errorheading").css("color", "green");

       //                     $(".ErrorMessage").show();

       //                     $("#overlay").fadeIn(400);

       //                     setTimeout(function () {
       //                         $("#overlay").fadeOut(400);
       //                     }, 3000);





                           
       //                 },
       //                 error: function (xhr, status, error) {
       //                     console.error("Error fetching cost head:", error);
       //                 }
       //             });
       //     }
       

       //});
            



        $(GlobleVariable.EditIcon).on("click", function () {
            var costid = $(GlobleVariable.HiddencostId).val();

          
            var costid = $("#hiddencostId").val();
            if (costid == '') {

                // alert("Please Select reacord");
                $("#MessageText").text("Please Select  Record for Edit for CostHead ").show();
                $(".DisplayMessage").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $(".DisplayMessage").fadeOut(400);
                }, 4000); // 3000 milliseconds = 3 second
            }
            else if (NumberOfChecked) {
                $("#Errorheading").text("Error!");
                $("#MessageText").text("Please Select One costhead Only To Edit ").show();
                $("#Errorheading").css("color", "red");
                $(".ErrorMessage").show();

                $("#overlay").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $("#overlay").fadeOut(400);
                }, 3000); // 3000 milliseconds = 3 second
            }
            else {
                var popupWindow = $(GlobleVariable.AddWindow).kendoWindow({
                                 width: "300px",
                                 title: "editpage",
                                 /*  height: "300",*/
                                 height: "200px",
                                 visible: false,
                                 actions: ["Close"]

                             }).data("kendoWindow");



                /*UpdatePopUp(shiftid);*/
                $.ajax({
                    url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,
                    type: "Get",
                    success: function (response) {
                        console.log(response);

                        $(GlobleVariable.CostHeadName).val(response.costHeadName).prop("disabled", true);
                        $(GlobleVariable.Remark).val(response.remarks).prop("disabled", false);
                        //$(GlobleVariable.IsActive).prop("disabled", false).addClass("disabled-checkbox");

                        if (response.isActive == true) {
                            $(GlobleVariable.IsActive).prop("checked", true);
                        }
                        else {
                            $(GlobleVariable.IsActive).prop("checked", false);
                        }

                        $(GlobleVariable.Hiddenfield).attr("value", costid);
                        $(GlobleVariable.ErrorContainer).hide();
                        $(GlobleVariable.CostnameError).hide();
                        $(GlobleVariable.CostErrorIcons).hide();
                        $(GlobleVariable.CostIcon).hide();

                        var newTitle = "CostHead:Edit";
                                             popupWindow.title(newTitle);
                                             popupWindow.center();
                                          $(GlobleVariable.Submit).text("Update");
                                            popupWindow.center().open();
                                           var wrapper = popupWindow.wrapper;
                                             var currentTop = wrapper.css("top");
                                             var newTop = parseFloat(currentTop) - 90; // Adjust the value to move it upwards
                                            wrapper.css({ top: newTop + "px" });

                        
                        window.open();
                    },
                    error: function () {

                    }

                });
            }
            
        });







        //view

        $("#view-icon").on("click", function (e) {
            var costid = $(GlobleVariable.Hiddenfield).val();

            var popupWindow = $(GlobleVariable.AddWindow).kendoWindow({
                width: "300px",
                title: "Viewpage",
                height:"200px",
                visible: false,
                actions: ["Close"]
         
            }).data("kendoWindow");
            e.preventDefault();
            var baseid = $('#base').attr('data-base');
            $.ajax({
                
                /*url: "https://localhost:7125/api/CostHeadController/GetDetailsbyId/" + costid,*/
            
                url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,

                type: "GET",
                success: function (response) {
                    console.log(response);

                    $("#costheadname").val(response.costHeadName).prop("disabled", true);
                    $("#remarks").val(response.remarks).prop("disabled", true);
                    $(GlobleVariable.IsActive).prop("disabled", true).addClass("disabled-checkbox");

                    $(GlobleVariable.ErrorContainer).hide();
                    $(GlobleVariable.CostnameError).hide();
                    $(GlobleVariable.CostErrorIcons).hide();
                    $(GlobleVariable.CostIcon).hide();
                    $(GlobleVariable.Submit).hide();
                  
                    var newTitle = "CostHead: View";
                    popupWindow.title(newTitle);
             
                    popupWindow.center().open();
                    var wrapper = popupWindow.wrapper;
                    var currentTop = wrapper.css("top");
                    var newTop = parseFloat(currentTop) - 120; // Adjust the value to move it upwards
                    wrapper.css({ top: newTop + "px" });
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching cost head:", error);
                }
            });
        });
    

        //viewtoolbar
        $(GlobleVariable.GridIcon).on("click", function () {
            var costid = $(GlobleVariable.HiddencostId).val();



            if (costid == '') {

                
                $("#MessageText").text("Please Select  Record for Edit for CostHead ").show();
                $(".DisplayMessage").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $(".DisplayMessage").fadeOut(400);
                }, 4000); // 3000 milliseconds = 3 second
            }
            else if (NumberOfChecked) {
                $("#Errorheading").text("Error!!!!");
                $("#MessageText").text("Please Select One costhead Only To Edit Thank You ").show();
                $("#Errorheading").css("color", "red");
                $(".ErrorMessage").show();

                $("#overlay").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $("#overlay").fadeOut(400);
                }, 3000); // 3000 milliseconds = 3 second
            }
           
            else {
                var popupWindow = $(GlobleVariable.AddWindow).kendoWindow({
                    width: "300px",
                    title: "Viewpage",
                    /*  height: "300",*/
                    height: "200px",
                    visible: false,
                    actions: ["Close"]

                }).data("kendoWindow");
               

                $.ajax({

                    url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,

                    /*url: "https://localhost:7125/api/CostHeadController/GetDetailsbyId/" + costid,*/
                    type: "GET",
                    success: function (response) {
                        console.log(response);

                        $(GlobleVariable.CostHeadName).val(response.costHeadName).prop("disabled", true);
                        $(GlobleVariable.Remark).val(response.remarks).prop("disabled", true);
                  
                        $(GlobleVariable.IsActive).prop("disabled", true).addClass("disabled-checkbox");
                        $(GlobleVariable.IsActive).prop("checked", response.isActive);
        
                        $(GlobleVariable.ErrorContainer).hide();
                        $(GlobleVariable.CostnameError).hide();
                        $(GlobleVariable.CostErrorIcons).hide();
                        $(GlobleVariable.CostIcon).hide();
                        $(GlobleVariable.Submit).hide();
                        /*$(GlobleVariable.Close).hide();*/

                        var newTitle = "CostHead: View";
                        popupWindow.title(newTitle);
                        /* popupWindow.center();*/
                        popupWindow.center().open();
                        var wrapper = popupWindow.wrapper;
                        var currentTop = wrapper.css("top");
                        var newTop = parseFloat(currentTop) - 120; // Adjust the value to move it upwards
                        wrapper.css({ top: newTop + "px" });
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching cost head:", error);
                    }
                });
            }
            $(GlobleVariable.HiddencostId).attr("value", '');

        });





   
      //delete

     function ToolBarIconDelete(costid) {
         var costid = $("#hiddencostId").val();
        
            $.ajax({
                url: baseid + '/api/CostHeadController/Delete/'+costid,
                type: "delete",
                success: function (response) {
                    ListAjaxcall();

                    $("#Errorheading").text("Success!");
                    $("#MessageText").text("CostHead Added Successfully ").show();
                    $("#Errorheading").css("color", "green");

                    /* $("#overlay").show();*/
                    $(".ErrorMessage").show();


                    $("#overlay").fadeIn(400);

                    setTimeout(function () {
                        $("#overlay").fadeOut(400);
                    }, 3000);
                    ListAjaxcall();
                },


                error: function () {

                }
            });
     }

     $("#deleteIcon").on("click", function () {
          var costid = $("#hiddencostId").val();
         
           
            if (NumberOfChecked) {

                $("#Errorheading").css("color", "red");
                $("#MessageText").text("Please Select  Only one  Delete!!! ").show();
                $(".ErrorMessage").show();

                $("#overlay").fadeIn(400);

                // Set a timer to hide the message after 3 seconds with a fade-out effect
                setTimeout(function () {
                    $("#overlay").fadeOut(400);
                }, 3000); // 3000 milliseconds = 3 second
            }
            else {
              
                $("#customModal").show();
                ToolBarIconDelete(costid);
                $("#btnConformDelete").on("click", function () {
                    ToolBarIconDelete(costid);
        });
                $("#btnConfirmCancel").on("click", function () {
                    $("#customModal").hide();
                });
            }
   
      });

        
     $(GlobleVariable.Deleteicon).on("click", function (e) {
            e.preventDefault();

         var costid = $("#hiddencostId").val();
            console.log("Cost ID:", costid);
            ToolBarIconDelete(costid);

            //confirmDelete(costid);
     });





        //deletecheck
        $(GlobleVariable.Grid).off('change', 'input[type="checkbox"]').on('change', 'input[type="checkbox"]', function () {
            var checked = $(this).is(':checked');
            /*      var grid = $("#grid").data("#kendoGrid");*/
            var grid = $(GlobleVariable.Grid).data("kendoGrid");
            var row = $(this).closest("tr");
            var dataItem = grid.dataItem(row);


            NumberOfChecked = $('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 1;

            if (checked) {
               
                $(GlobleVariable.HiddencostId).attr("value", dataItem.costId);
                
            } else {
                
                
            }
        });



    





        // Initialize Kendo Window for the popup
        var window = $(GlobleVariable.AddWindow).kendoWindow({
            title: "Cost Head : Add",
            visible: false,
            modal: true,
            resizable: false,
            width: 1000,
            height: 460
           /* height:300*/
            

        }).data("kendoWindow");
        $(GlobleVariable.AddWindow).parent().addClass("custom-title-bar");



        //});

        // Add click event for the addButton
        $(GlobleVariable.AddButton).on("click", function () {

            $(GlobleVariable.CostHeadName).val("").prop("disabled", false);
            $(GlobleVariable.Remark).val("").prop("disabled", false);
            $(GlobleVariable.IsActive).prop("checked", true).prop("disabled", false);

            $(".edit-properties").hide();
            $(GlobleVariable.ErrorContainer).hide();
            $(GlobleVariable.CostIcon).hide();
       
            window.setOptions({ title: "Cost Head:Add" });
            $("#formTitle").text("Add New Item");
            $(GlobleVariable.Submit).text("Save");

            $(GlobleVariable.Submit).text("Save").show();
            $(GlobleVariable.Close).show();

            window.center();
            var wrapper = window.wrapper;
            var topPosition = wrapper.offset().top - 5;
            wrapper.css({ top: topPosition });

            // Open the window as a popup
            window.open();
        });


       
        //function updateCost(cost) {
        //    var costid = $(GlobleVariable.Hiddenfield).val();

        //    $.ajax({
        //        url: 'https://localhost:7125/api/CostHeadController/UpdateCost/' + costid,
       
        //var window = $("#addWindow").kendoWindow({
        //    title: "Add New Item",
        //    visible: false,
        //    modal: true,
        //    resizable: false,
        //    width: 600,
        //    height: 600
        //}).data("kendoWindow");

        //        type: "PATCH",
        //        contentType: "application/json; charset=utf-8",
        //        data: JSON.stringify(cost), // Convert the data to JSON

        //        success: function (response) {
        //            alert(" form Successfully updated");
        //            console.log("Data saved successfully:", response);
        //            window.close();
        //            ListAjaxcall();
           
        //    window.center();
        //    var wrapper = window.wrapper;
        //    var topPosition = wrapper.offset().top - 20; 
        //    wrapper.css({ top: topPosition });

        //    // Open the window as a popup
        //    window.open();
        //});

        //        },
        //        error: function (xhr, status, error) {
        //            console.error(xhr.responseText);
        //            console.error(error);
        //            console.error(status);
        //        }
        //    });
        //}



        $(GlobleVariable.Close).click(function () {
            window.close(); // Close the page
        });
        $("#submit").on("click", function (e) {


        $(GlobleVariable.Submit).on("click", function (e) {

            /*e.preventDefault();*/
            var buttonValue = $(this).text();
            if (buttonValue == 'Save') {
           

            var CostHeadName = $("#costheadname").val();
            var Remarks = $("#remarks").val();
            var IsActive = $("#isactive").prop("checked");

                console.log("Button Value:", buttonValue);


                var CostHeadName = $(GlobleVariable.CostHeadName).val();
                var Remarks = $(GlobleVariable.Remark).val();
                var IsActive = $(GlobleVariable.IsActive).prop("checked");

            var cost = {
                    CostHeadName: $(GlobleVariable.CostHeadName).val(),
                    Remarks: $(GlobleVariable.Remark).val(),
                IsActive: IsActive 
                //IsActive: $("isactive").prop("checked"),
       

            };
            var IsValid = true;


           

            if (cost.CostHeadName == '') {
                    $(GlobleVariable.CostnameError).text('Please Enter CostHeadName').show();
                    $(GlobleVariable.CostErrorIcons).show();
                    $(GlobleVariable.CostIcon).show();
                    $(GlobleVariable.ErrorContainer).show();
                IsValid = false;
            }
            else {
                var nameRegex = /^[a-zA-Z]{1}[a-zA-Z\s]+$/;
                if (!nameRegex.test(cost.CostHeadName)) {
                        $(GlobleVariable.CostnameError).text('Invalid CostHeadName').show();
                        $(GlobleVariable.CostErrorIcons).show();
                        $(GlobleVariable.CostIcon).show();
                        $(GlobleVariable.ErrorContainer).show();
                    IsValid = false;
                }
            }
               
           



            if (IsValid && CheckExpression) {
                    var baseid = $('#base').attr('data-base');
                $.ajax({
                       
                        url: baseid +'/api/CostHeadController/PostCostHead/',
                    type: "Post",
                    data: cost,
                    success: function (response) {

                        console.log(response);

                        window.close();
                           // ListAjaxcall();

                            $("#Errorheading").text("Success!!!");
                            $("#MessageText").text("Cost Head Added Successfully Thank You ").show();
                            $("#Errorheading").css("color", "green");
                           
                           /* $("#overlay").show();*/
                            $(".ErrorMessage").show();

                            
                            $("#overlay").fadeIn(400);

                            setTimeout(function () {
                                $("#overlay").fadeOut(400);
                            }, 3000);

                            ListAjaxcall();
                    },


                });


                }
                
            }

            else {

                var CostHeadName = $(GlobleVariable.CostHeadName).val();
                var Remarks = $(GlobleVariable.Remark).val();
                var IsActive = $(GlobleVariable.IsActive).prop("checked");

                    var cost = {
                        CostHeadName: $(GlobleVariable.CostHeadName).val(),
                        Remarks: $(GlobleVariable.Remark).val(),
                        IsActive: IsActive
                       

                    };

                
               
                    var costid = $(GlobleVariable.Hiddenfield).val();
                    var baseid = $('#base').attr('data-base');
                    $.ajax({
                      
                        url: baseid + '/api/CostHeadController/UpdateCost/' + costid,

                        type: "PATCH",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(cost), // Convert the data to JSON

                        success: function (response) {

                            window.close();

                            $("#Errorheading").text("Success!");
                            $("#MessageText").text("CostHead Updated Successfully ").show();
                            $("#Errorheading").css("color", "green");

                            $(".ErrorMessage").show();

                            $("#overlay").fadeIn(400);

                            setTimeout(function () {
                                $("#overlay").fadeOut(400);
                            }, 3000);

                            ListAjaxcall();

                

                        },
                        error: function (xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error(error);
                            console.error(status);
            }
                    });


            }
        });
    
    }


    
});












