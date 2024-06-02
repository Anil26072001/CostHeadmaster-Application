

//var GlobleVariable = {
//    CostHeadName: "#costheadname",
//    costnameError: "#FirstnameError",
//    costnameErrorIcons: "#FirstnameErrorIcons",
//    Remark: "#remark",
//    IsActive: "#active"
//};

//$(document).ready(function () {
//    var baseid = $("#base").data('base');

//    ListAjaxcall();
//    var jq = $.noConflict();
//    function ListAjaxcall() {
//        $.ajax({
//            url: 'https://localhost:7125/api/CostHeadController/GetCostHead',
//            //baseid + 'api/CostHeadController/GetCostHead',
//            type: "GET",
//            success: function (response) {
//                console.log(response);
//                KendbindData(response);
//            },
//            error: function (xhr, status, error) {
//                alert('Error occurred while retrieving the data');
//                console.error("Ajax error:", status, error);
//            }
//        });
//    }

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
 

   // ListAjaxcall();
    var jq = $.noConflict();
    var mode = $("#modeid").val();
    
    $("#costheadname").on('input', function () {
        var name = $("#costheadname").val();
        console.log(name)
        if (!/^[a-zA-Z]{1}[a-zA-Z\s]+$/.test(name)) {
            $("#costnameError").text("FirstName should only contain letters").show();
            $("#costErrorIcons").show();
            $("#costicon").show();
            CheckExpression = false;

        } else {
            $("#costnameError").hide();
            $("#costErrorIcons").hide();
            $("#costicon").hide();
            CheckExpression = true;
        }
    });







   /* if (mode == "Listpage") {*/
        ListAjaxcall();
        function ListAjaxcall() {
            $.ajax({
                url: 'https://localhost:7125/api/CostHeadController/GetCostHead',
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
            pageSize: 10
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
            toolbar: [

                {
                    template: "<a href='\\#' class='k-button k-button-icontext' id='addButton'><span class='k-icon k-i-plus'></span> </a>"
                },
                {
                    template: "<span id='editIcon' class='material-icons toolbar-icon'>edit</span>"
                },
                {
                    template: "<span id='gridIcon' class='material-icons toolbar-icon'>grid_on</span>"
                },
                {
                    template: "<span id='deleteIcon' class='material-icons toolbar-icon'>delete</span>"
                },
                {
                    template: "<span id='refreshIcon' class='material-icons toolbar-icon'>refresh</span>"
                },

                
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
                    width: 80,
                    attributes: {
                        "class": "checkbox-align"
                    },
                    headerAttributes: {
                        "class": "checkbox-align"
                    }
                },
                {
                    field: "costId",
                    title: "Cost ID",
                    width: 100
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
                    width: 100,
                    title: "Action",
                    template: "<span id='curddropdown' class='material-icons material-symbols-outlined'>more_vert</span>"
                }
                
            ]

        });




        $("#grid").off('click', '.material-symbols-outlined').on('click', '.material-symbols-outlined', function () {
            var id = $(this).data('id');

            var dialog = $("#dialog-box");
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


       
        $(document).on('click', function () {
            $("#dialog-box").hide();
        });

        $("#dialog-box").on('click', function (event) {
            
            event.stopPropagation();
        });

        $("#dialog-box").on('click', '#close-icon', function () {
            $("#dialog-box").hide();
        });
   

        







        // Initialize Kendo Window for the popup
        var window = $("#addWindow").kendoWindow({
            title: "Add New Item",
            visible: false,
            modal: true,
            resizable: false,
            width: 600,
            /*height: 490*/
            height:540
        }).data("kendoWindow");
        $("#addWindow").parent().addClass("custom-title-bar");

        /* Add click event for the addButton*/
        //$("#addButton").on("click", function () {
        //    // Open the window as a popup
            

        //    window.center().open();



        //});



       

        // Add click event for the addButton
        $("#addButton").on("click", function () {

            window.center();
            var wrapper = window.wrapper;
            var topPosition = wrapper.offset().top - 5;
            wrapper.css({ top: topPosition });

            // Open the window as a popup
            window.open();
        });

       
        //var window = $("#addWindow").kendoWindow({
        //    title: "Add New Item",
        //    visible: false,
        //    modal: true,
        //    resizable: false,
        //    width: 600,
        //    height: 600
        //}).data("kendoWindow");

        //$("#addWindow").parent().addClass("custom-title-bar");

        //// Add click event for the addButton
        //$("#addButton").on("click", function () {
           
        //    window.center();
        //    var wrapper = window.wrapper;
        //    var topPosition = wrapper.offset().top - 20; 
        //    wrapper.css({ top: topPosition });

        //    // Open the window as a popup
        //    window.open();
        //});




        $("#close").click(function () {
            window.close(); // Close the page
        });
        $("#submit").on("click", function (e) {

            /*e.preventDefault();*/
           

            var CostHeadName = $("#costheadname").val();
            var Remarks = $("#remarks").val();
            var IsActive = $("#isactive").prop("checked");

            var cost = {
                CostHeadName:$("#costheadname").val(),
                Remarks: $("#remarks").val(),
                IsActive: IsActive 
                //IsActive: $("isactive").prop("checked"),
       
            };
            var IsValid = true;


           

            if (cost.CostHeadName == '') {
                $("#costnameError").text('Please Enter CostHeadName').show();
                $("#costErrorIcons").show();
                $("#costicon").show();
                IsValid = false;
            }
            else {
                var nameRegex = /^[a-zA-Z]{1}[a-zA-Z\s]+$/;
                if (!nameRegex.test(cost.CostHeadName)) {
                    $("#costnameError").text('Invalid CostHeadName').hide();
                    $("#costErrorIcons").hide();
                    $("#costicon").hide();
                    IsValid = false;
                }
            }
               
           



            if (IsValid && CheckExpression) {

                $.ajax({
                    url: 'https://localhost:7125/api/CostHeadController/PostCostHead',
                    type: "Post",
                    data: cost,
                    success: function (response) {
                        console.log(response);
                        alert("Successfully submitted");
                        console.log("Data saved successfully:", response);
                        window.close();
                    },

                });




                

            }


        });
    }
});












