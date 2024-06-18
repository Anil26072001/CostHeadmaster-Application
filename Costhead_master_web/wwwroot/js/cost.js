
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

            url: baseid + '/api/CostHeadController/GetCostHead',

            type: "GET",
            success: function (response) {

                console.log("AJAX Success: ", response); // Log the response
                KendbindData(response);

                KendbindData(response);
            },
            error: function (xhr, status, error) {
                alert('Error occurred while retrieving the data');
                console.error("Ajax error:", status, error);
            }
        });

    }


  



    var checkedIds = [];

    function getCheckedIds() {
        checkedIds = [];
        $("#grid .k-grid-content tr").each(function () {
            var checkbox = $(this).find("td:first input[type='checkbox']");
            if (checkbox.prop("checked")) {
                var dataItem = $("#grid").data("kendoGrid").dataItem($(this));
                checkedIds.push(dataItem.costHeadName); // Assuming costHeadName is the unique identifier
            }
        });
    }

    function KendbindData(listapidata) {
        console.log("KendbindData called with: ", listapidata);


        var dataSource = new kendo.data.DataSource({
            data: listapidata,
            pageSize: 20
        });

        $("#grid").kendoGrid({

            dataSource: dataSource,
            height: 500,
            scrollable: true,
            pageable: {
                buttonCount: 5,
                numeric: true,
                refresh: false

            },
            filterable: true,
            selectable: "multiple,row",
            columns: [
                {
                    selectable: true,
                    width: 19,
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
                    /*template: "<span id='curddropdown' data-id='#:costId#' class='material-icons material-symbols-outlined'>more_vert</span>"*/
                    template: "<span id='curddropdown-#:costId#' data-id='#:costId#' class='material-icons material-symbols-outlined'>more_vert</span>"
                
                }
            ],

         



            change: function (e) {
                var grid = e.sender;
                var selectedRows = grid.select();
                var selectedDataItems = [];
                var selectedCostIds = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var dataItem = grid.dataItem(selectedRows[i]);
                    selectedDataItems.push(dataItem);
                    selectedCostIds.push(dataItem.costId); // Extracting costId
                }
                console.log("Selected items: ", selectedDataItems);
                console.log("Selected costIds: ", selectedCostIds);
                $(GlobleVariable.HiddencostId).val(selectedCostIds.join(','));  // Passing the costIds
            },
            dataBound: function () {
                var grid = this;

                grid.tbody.find("tr").each(function () {
                    var row = $(this);
                    var checkbox = row.find("td:first input[type='checkbox']");

                    // Handle checkbox click to toggle row selection
                    checkbox.click(function (e) {
                        e.stopPropagation();  // Prevent triggering row selection twice
                        var isChecked = $(this).prop("checked");

                        if (isChecked) {
                            row.addClass("k-state-selected");
                            grid.select(row);  // Ensure row is selected
                            console.log("Selected costId: ", grid.dataItem(row).costId); // Log costId of selected row
                        } else {
                            row.removeClass("k-state-selected");
                            grid.clearSelection(row);  // Clear row selection
                        }
                    });

                    // Prevent row click from toggling checkbox and row selection
                    row.click(function (e) {
                        e.stopPropagation();  // Prevent triggering row selection twice
                    });

                    // Prevent row double-click from toggling checkbox and row selection
                    row.dblclick(function (e) {
                        e.stopPropagation();  // Prevent triggering row selection twice
                    });
                });

                // Bind the click event for the action icons
                $(".material-symbols-outlined").off('click').on('click', function (event) {
                    var id = $(this).data('id');
                    $(GlobleVariable.Hiddenfield).attr("value", id);

                    var dialog = $(GlobleVariable.Dialogbox);
                    var dialogWidth = dialog.outerWidth();
                    var dialogHeight = dialog.outerHeight();

                    var top = event.pageY - dialogHeight / 2;
                    var left = event.pageX - dialogWidth - 10; // Subtracting dialog width and some padding to position left

                    dialog.css({
                        top: top + "px",
                        left: left + "px",
                        display: "block" // Ensure the dialog box is displayed
                    });

                    event.stopPropagation();
                });
            }
        });

    

           
    


        





         $("#ExportPdfExcel").click(function () {
             $("#dropdownMenu").show();
            
         });

         $("#exportToExcelSelected").on('click', function () {
             console.log(checkedIds);
             var grid = $("#grid").data("kendoGrid");
             var dataSource = grid.dataSource;
             var data = dataSource.data();
             console.log(data);
             var RecordData = [];
             for (var j = 0; j < checkedIds.length; j++) {

                 for (var i = 0; i < data.length; i++) {
                     if (data[i].costHeadName === checkedIds[j]) {
                         RecordData.push(data[i]); // Push the found record into the array
                         break;
                     }
                 }
             }
             var jsonData = [];
             console.log(jsonData);
             RecordData.forEach(function (item) {
                 jsonData.push({
                     "CostHeadName": item.costHeadName,
          
                     "Remark": item.remark,
                     "Active": item.isActive,
                     // add all the necessary columns here
                 });
             });

             // Convert JSON to sheet
             var worksheet = XLSX.utils.json_to_sheet(jsonData);

             // Create a new workbook
             var workbook = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(workbook, worksheet, "CostHead");

             // Export the workbook
             XLSX.writeFile(workbook, "CostHead.xlsx");

         });
         // Export grid data to Excel
         // Export all data to Excel
         $("#exportToExcel").on("click", function (e) {
             var grid = $("#grid").data("kendoGrid");
             var data = grid.dataSource.data();
             console.log(grid);
             console.log(data);

             var jsonData = [];

             data.forEach(function (item) {
                 jsonData.push({
                     "Costheadname": item.costHeadName,
                     
                     "Remark": item.remark,
                     "Active": item.isActive,
                     // add all the necessary columns here
                 });
             });
                

             // Convert JSON to sheet
             var worksheet = XLSX.utils.json_to_sheet(jsonData);

             // Create a new workbook
             var workbook = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(workbook, worksheet, "Costheadname");

             // Export the workbook
             XLSX.writeFile(workbook, "Costheadname.xlsx");
         });









        //$("#grid").off('click', '.material-symbols-outlined').on('click', '.material-symbols-outlined', function () {
        //    var id = $(this).data('id');
        //    $(GlobleVariable.Hiddenfield).attr("value", id);

        //    var dialog = $(GlobleVariable.Dialogbox);
        //    var dialogWidth = dialog.outerWidth();
        //    var dialogHeight = dialog.outerHeight();

        //    var top = event.pageY - dialogHeight / 2;
        //    var left = event.pageX - dialogWidth - 10; // Subtracting dialog width and some padding to position left

        //    dialog.css({
        //        top: top + "px",
        //        left: left + "px"
        //    }).show();
        //    //  dialog.open();
        //    event.stopPropagation();


        //});


       

        $(document).click(function (event) {
            if (!$(event.target).closest(GlobleVariable.Dialogbox).length) {
                $(GlobleVariable.Dialogbox).hide();
            }
        });

        $(GlobleVariable.Dialogbox).on('click', function (event) {

            event.stopPropagation();
        });

        $(GlobleVariable.Dialogbox).on('click', '#close-icon', function () {
            $(GlobleVariable.Dialogbox).hide();
        });

     

        //refress
        $("#btnRefresh").on("click", function () {

            ListAjaxcall();
            $("#Errorheading").text("Success!");
            $("#MessageText").text("Refress  Successfully ").show();

        });


        //dialogbox edit

        $(GlobleVariable.Dialogbox).on("click", "#IdValue", function () {


            $(GlobleVariable.ErrorContainer).hide();
            $(GlobleVariable.CostnameError).hide();
            $(GlobleVariable.CostErrorIcons).hide();
            $(GlobleVariable.CostIcon).hide();
            $(GlobleVariable.Submit).show();
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

                url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,
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


        $("#close").click(function () {
            window.close();
           
            // Close the page
            ListAjaxcall();
        });



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

            /*else if (NumberOfChecked) {*/
            else if ($('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 1) {
            /*else if (NumberOfChecked >=1) {*/
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



                $.ajax({
                    url: baseid + '/api/CostHeadController/GetDetailsbyId/' + costid,
                    type: "Get",
                    success: function (response) {
                        console.log(response);

                        $(GlobleVariable.CostHeadName).val(response.costHeadName).prop("disabled", true);
                        $(GlobleVariable.Remark).val(response.remarks).prop("disabled", false);
                        $(GlobleVariable.IsActive).prop("disabled", false).addClass("disabled-checkbox");

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
                        $(GlobleVariable.Submit).show();

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
                height: "200px",
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
            /*else if (NumberOfChecked) {*/
            else if ($('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 1) { 
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
                url: baseid + '/api/CostHeadController/Delete/' + costid,
                type: "delete",
                success: function (response) {
                    ListAjaxcall();

                    $("#Errorheading").text("Success!");
                    $("#MessageText").text("CostHead Added Successfully ").show();
                    $("#Errorheading").css("color", "green");

                     $("#overlay").show();
                    $(".ErrorMessage").show();


                    $("#overlay").fadeIn(400);

                    setTimeout(function () {
                        $("#overlay").fadeOut(400);
                    }, 300);
                    ListAjaxcall();
                },


                error: function () {

                }
            });
        }


        $("#deleteIcon").on("click", function () {
            var costid = $("#hiddencostId").val();

            //var checkedCheckboxes = $('#grid .k-grid-content tbody input[type="checkbox"]:checked').length;

           // if (checkedCheckboxes > 1) {
            if (NumberOfChecked) {
           /*  if ($('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 1) { */

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


                ToolBarIconDelete(costid);
                //$("#btnConformDelete").on("click", function () {
                //    ToolBarIconDelete(costid);
                //});
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
       
            
        });





    













        // Initial setup for icons
        $("#editIcon, #gridIcon, #deleteIcon").css({
            "opacity": "0.5",
            "pointer-events": "none"
        });

        // Event handler for checkbox change
        $(GlobleVariable.Grid).off('change', 'input[type="checkbox"]').on('change', 'input[type="checkbox"]', function () {
            var checked = $(this).is(':checked');
            var grid = $(GlobleVariable.Grid).data("kendoGrid");
            var row = $(this).closest("tr");
            var dataItem = grid.dataItem(row);

            var anyChecked = $('#grid .k-grid-content tbody input[type="checkbox"]:checked').length > 0;

            if (checked) {
                $(GlobleVariable.HiddencostId).attr("value", dataItem.costId);
            } else {
                var index = checkedIds.indexOf(dataItem.costId);
                if (index > -1) {
                    checkedIds.splice(index, 1);
                }
            }

            if (anyChecked) {
                $("#hiddencostId").attr("value", dataItem.costId);
                $("#editIcon, #gridIcon, #deleteIcon").css({
                    "opacity": "1",
                    "pointer-events": "auto",
                    "cursor": "pointer"
                });
            } else {
                $("#hiddencostId").attr("value", '');
                $("#editIcon, #gridIcon, #deleteIcon").css({
                    "opacity": "0.5",
                    "pointer-events": "none"
                });
            }
        });





    


        // Initialize Kendo Window for the popup

      


        var window = $(GlobleVariable.AddWindow).kendoWindow({
            title: "Cost Head : Add",
            visible: false,
            modal: true,
            resizable: false,
            width: 800,
            height: 400
            /* height:300*/


        }).data("kendoWindow");
        $(GlobleVariable.AddWindow).parent().addClass("custom-title-bar");



        //});

        // Add click event for the addButton
        $(GlobleVariable.AddButton).on("click", function () {

            $(GlobleVariable.CostHeadName).val("").prop("disabled", false);
            $(GlobleVariable.Remark).val("").prop("disabled", false);
            $(GlobleVariable.IsActive).prop("checked", true).prop("disabled", false);

          ////  $(".edit-properties").hide();
            $(GlobleVariable.ErrorContainer).hide();
            $(GlobleVariable.CostIcon).hide();

            window.setOptions({ title: "Cost Head:Add" });
            $("#formTitle").text("Add New Item");
            $(GlobleVariable.Submit).text("Save");

           $(GlobleVariable.Submit).text("Save").show();
            $(GlobleVariable.Close).show();
                
            window.center();
            var wrapper = window.wrapper;
            var topPosition = wrapper.offset().top - 4;
            wrapper.css({ top: topPosition });

            // Open the window as a popup
            window.open();
        });



        

       
        //$("#submit").on("click", function (e) {


        //    $(GlobleVariable.Submit).on("click", function (e) {

        //        /*e.preventDefault();*/
        //        var buttonValue = $(this).text();
        //        if (buttonValue == 'Save') {


        //            var CostHeadName = $("#costheadname").val();
        //            var Remarks = $("#remarks").val();
        //            var IsActive = $("#isactive").prop("checked");

        //            console.log("Button Value:", buttonValue);


        //            var CostHeadName = $(GlobleVariable.CostHeadName).val();
        //            var Remarks = $(GlobleVariable.Remark).val();
        //            var IsActive = $(GlobleVariable.IsActive).prop("checked");

        //            var cost = {
        //                CostHeadName: $(GlobleVariable.CostHeadName).val(),
        //                Remarks: $(GlobleVariable.Remark).val(),
        //                IsActive: IsActive
        //                //IsActive: $("isactive").prop("checked"),


        //            };
        //            var IsValid = true;




        //            if (cost.CostHeadName == '') {
        //                $(GlobleVariable.CostnameError).text('Please Enter CostHeadName').show();
        //                $(GlobleVariable.CostErrorIcons).show();
        //                $(GlobleVariable.CostIcon).show();
        //                $(GlobleVariable.ErrorContainer).show();
        //                IsValid = false;
        //            }
        //            else {
        //                var nameRegex = /^[a-zA-Z]{1}[a-zA-Z\s]+$/;
        //                if (!nameRegex.test(cost.CostHeadName)) {
        //                    $(GlobleVariable.CostnameError).text('Invalid CostHeadName').show();
        //                    $(GlobleVariable.CostErrorIcons).show();
        //                    $(GlobleVariable.CostIcon).show();
        //                    $(GlobleVariable.ErrorContainer).show();
        //                    IsValid = false;
        //                }
        //            }



        //            if (IsValid && CheckExpression) {
        //                var baseid = $('#base').attr('data-base');
        //                $.ajax({

        //                    url: baseid + '/api/CostHeadController/PostCostHead/',
        //                    type: "Post",
        //                    data: cost,
        //                    success: function (response) {

        //                        console.log(response);

        //                        window.close();
        //                        // ListAjaxcall();

        //                        $("#Errorheading").text("Success!!!");
        //                        $("#MessageText").text("Cost Head Added Successfully Thank You ").show();
        //                        $("#Errorheading").css("color", "green");

        //                        /* $("#overlay").show();*/
        //                        $(".ErrorMessage").show();


        //                        $("#overlay").fadeIn(400);

        //                        setTimeout(function () {
        //                            $("#overlay").fadeOut(400);
        //                        }, 3000);

        //                        ListAjaxcall();
        //                    },
        //                    error: function (xhr, status, error) {
        //                        if (xhr.status === 409) { // Conflict status code
        //                            $(".ErrorMessage").hide(); // Hide any existing error messages
        //                            $("#overlay").hide(); // Hide the overlay
        //                            $("#Errorheading").text("Error");
        //                            $("#MessageText").text("Cost Head Name already exists. Please choose a different name.").show();
        //                            $("#Errorheading").css("color", "red");
        //                            $(".ErrorMessage").show();

        //                            setTimeout(function () {
        //                                $("#overlay").fadeOut(400);
        //                            }, 3000);
        //                        }
        //                        else {
        //                            console.error("An error occurred: ", status, error);
        //                        }
        //                    }


        //                });


        //            }
        //        }




        //        else {

        //            var CostHeadName = $(GlobleVariable.CostHeadName).val();
        //            var Remarks = $(GlobleVariable.Remark).val();
        //            var IsActive = $(GlobleVariable.IsActive).prop("checked");

        //            var cost = {
        //                CostHeadName: $(GlobleVariable.CostHeadName).val(),
        //                Remarks: $(GlobleVariable.Remark).val(),
        //                IsActive: IsActive


        //            };



        //            var costid = $(GlobleVariable.Hiddenfield).val();
        //            var baseid = $('#base').attr('data-base');
        //            $.ajax({

        //                url: baseid + '/api/CostHeadController/UpdateCost/' + costid,

        //                type: "PATCH",
        //                contentType: "application/json; charset=utf-8",
        //                data: JSON.stringify(cost), // Convert the data to JSON

        //                success: function (response) {

        //                    window.close();

        //                    $("#Errorheading").text("Success!");
        //                    $("#MessageText").text("CostHead Updated Successfully ").show();
        //                    $("#Errorheading").css("color", "green");

        //                    $(".ErrorMessage").show();

        //                    $("#overlay").fadeIn(400);

        //                    setTimeout(function () {
        //                        $("#overlay").fadeOut(400);
        //                    }, 3000);

        //                    ListAjaxcall();

        //                },
        //                error: function (xhr, status, error) {
        //                    console.error(xhr.responseText);
        //                    console.error(error);
        //                    console.error(status);
        //                }
        //            });


        //        }
        //    });

        //});



        $(GlobleVariable.Submit).on("click", function (e) {
            var buttonValue = $(this).text();
            if (buttonValue === 'Save') {
                var CostHeadName = $(GlobleVariable.CostHeadName).val();
                var Remarks = $(GlobleVariable.Remark).val();
                var IsActive = $(GlobleVariable.IsActive).prop("checked");

                var cost = {
                    CostHeadName: CostHeadName,
                    Remarks: Remarks,
                    IsActive: IsActive
                };

                var IsValid = true;

                // Validation for CostHeadName
                if (cost.CostHeadName === '') {
                    $(GlobleVariable.CostnameError).text('Please Enter CostHeadName').show();
                    $(GlobleVariable.CostErrorIcons).show();
                    $(GlobleVariable.CostIcon).show();
                    $(GlobleVariable.ErrorContainer).show();
                    IsValid = false;
                } else {
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
                        url: baseid + '/api/CostHeadController/PostCostHead/',
                        type: "POST",
                        data: cost,
                        success: function (response) {
                            console.log(response);
                            window.close();
                            $("#Errorheading").text("Success!!!");
                            $("#MessageText").text("Cost Head Added Successfully Thank You").show();
                            $("#Errorheading").css("color", "green");
                            $(".ErrorMessage").show();
                            $("#overlay").fadeIn(400);
                            setTimeout(function () {
                                $("#overlay").fadeOut(400);
                            }, 3000);
                            ListAjaxcall();
                        },
                        error: function (xhr, status, error) {
                           
                            if (xhr.status === 409) {
                                window.close();
                                // Conflict status code
                                $("#Errorheading").css("color", "red");
                                $("#MessageText").text("Cost Head Name already exists. Please choose a different name..").show();
                                $(".ErrorMessage").show();

                                $("#overlay").fadeIn(400);

                                // Set a timer to hide the message after 3 seconds with a fade-out effect
                                setTimeout(function () {
                                    $("#overlay").fadeOut(400);
                                }, 3000); // 3000 milliseconds = 3 second
                            }
                        }
                    });
                }
            } else {
                var CostHeadName = $(GlobleVariable.CostHeadName).val();
                var Remarks = $(GlobleVariable.Remark).val();
                var IsActive = $(GlobleVariable.IsActive).prop("checked");

                var cost = {
                    CostHeadName: CostHeadName,
                    Remarks: Remarks,
                    IsActive: IsActive
                };

                var costid = $(GlobleVariable.Hiddenfield).val();
                var baseid = $('#base').attr('data-base');
                $.ajax({
                    url: baseid + '/api/CostHeadController/UpdateCost/' + costid,
                    type: "PATCH",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(cost),
                    success: function (response) {
                        window.close();
                        $("#Errorheading").text("Success!");
                        $("#MessageText").text("CostHead Updated Successfully").show();
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