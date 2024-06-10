//var CostHead={

//    Email: "#email",
//    EmailError: "#emailError",

//    Password: "#password",
//    PasswordError:"#passwordError",

//    Login:"login-btn"

//};


//$(document).ready(function () {

//    var CheckExpression = true;

//    $(CostHead.Email).on('input', function () {
//        var email = $(this).val();
//        if (!/^[a-z]{1}[a-z0-9]+@gmail\.com$/.test(email)) {
//            $(CostHead.EmailError).text('Enter a valid email address').show();
//            CheckExpression = false;
//        } else {
//            $(CostHead.EmailError).hide();
//            if (email.trim() !== '') {
//                $(this).removeClass('is-invalid').addClass('is-valid');
//            } else {
//                $(this).removeClass('is-valid is-invalid');
//                CheckExpression = true;
//            }
//        }
//    });




//    $(CostHead.Password).on("input", function () {
//        var password_val = $(CostHead.Password).val();
//            console.log(password_val);

//            var passwordPattern = /^[ -~]{4,6}$/;

//            if (!passwordPattern.test(password_val)) {
//                $(CostHead.PasswordError).text('Please Enter password').show();
//                return false;
//            } else if (password_val.length < 4 || password_val.length > 15) {
//                $(CostHead.PasswordError).text('Password must be between 4 and 15 characters').show();
//                return false;
//            } else {
//                $(CostHead.PasswordError).hide();
//                return true;
//            }
//    });





//        $("#login").on("click", function (e) {

//            e.preventDefault();



//            var Email = $(CostHead.Email).val();
//            var password = $(CostHead.Password).val();





//            var IsValid = true;

//            if (CostHead.Email == '') {
//                $(CostHead.EmailError).text('Please Enter Email').show();
//                IsValid = false;
//                return false;
//            }
//            else {
//                var emailRegex = /[a-z]{1}[a-z0-9]+@gmail.com$/;
//                if (!emailRegex.test(emailRegex)) {
//                    $(CostHead.EmailError).text('Invalid Email Format').show();
//                    $(CostHead.EmailIcon).show();

//                    IsValid = false;
//                }
//            }
//        });

//});











$(document).ready(function () {
    var isvalid = true;

    var idreferences = {
        loginform: "#LoginPage",
        emaildata: "#id-email",
        passworddata: "#password-id",
        errordata: "#error",
        errordata1: "#error1",
        emailicon: "#emailicon",
        passwordicon: "#passwordicon",
    };

    var emailregex = /^[a-z]{1}[a-z0-9]+@gmail.com$/;
    $(idreferences.emaildata).on("input", function () {
        var email_val = $(idreferences.emaildata).val();
        console.log(email_val);
        if (email_val == '') {
            $('#error').text('Please Enter Email').show();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        }
        else if (!emailregex.test(email_val)) {
            $('#error').text('Please Enter valid Email').show();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle red"></i>').show();
            isvalid = false;
            return false;
        } else {
            $(idreferences.errordata).hide();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle"></i>').hide();
            return true;
        }
    });
    $(idreferences.passworddata).on("input", function () {
        var password_val = $(idreferences.passworddata).val();
        console.log(password_val);
        if (password_val == '') {
            $("#error1").text('Please Enter password').show();
            $('#passwordicon').html('<i class="fas fa-exclamation-circle"></i>').show();
            isvalid = false;
            return false;
        } else {
            $(idreferences.errordata1).hide();
            $(idreferences.passwordicon).html('<i class="fas fa-exclamation-circle"></i>').hide();
            isvalid = true;
            return true;
        }
    });

    $(idreferences.loginform).submit(function (e) {

        e.preventDefault();

        var email_val = $("#id-email").val();
        var password_val = $(idreferences.passworddata).val();

        var login = {

            email: $("#id-email").val(),
            password: $("#password-id").val()

        };

        console.log(password_val);
        //if (email_val == '' && password_val != '') {
        //    $("#error").text('Please Enter Email').show();
        //    $("#emailicon").html('<i class="fas fa-exclamation-circle"></i>').show();

        //    isvalid = false;
        //    return false;
        //}
        //if (password_val == '' && email_val !== '') {
        //    $('#error1').text('Please Enter password').show();
        //    $(idreferences.passwordicon).html('<i class="fas fa-exclamation-circle"></i>').show();
        //    isvalid = false;
        //    return false;
        //}

        //if (password_val == '' && email_val === '') {
        //    $(idreferences.errordata1).text('Please Enter password').show();
        //    $(idreferences.passwordicon).html('<i class="fas fa-exclamation-circle"></i>').show();
        //    $(idreferences.errordata).text('Please Enter Email').show();
        //    $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle"></i>').show();
        //    isvalid = false;
        //    return false;
        //}
        if (email_val === '') {
            $(idreferences.errordata).text('Please Enter Email').show();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle"></i>').show();
            isvalid = false;
        } else if (!emailregex.test(email_val)) {
            $(idreferences.errordata).text('Please Enter valid Email').show();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle red"></i>').show();
            isvalid = false;
        } else {
            $(idreferences.errordata).hide();
            $(idreferences.emailicon).hide();
        }

        if (password_val === '') {
            $(idreferences.errordata1).text('Please Enter password').show();
            $(idreferences.passwordicon).html('<i class="fas fa-exclamation-circle"></i>').show();
            $(idreferences.errordata).text('Please Enter Email').show();
            $(idreferences.emailicon).html('<i class="fas fa-exclamation-circle"></i>').show();
            isvalid = false;
        //} else {
        //    $(idreferences.errordata1).hide();
        //    $(idreferences.passwordicon).hide();
        }


        /*var baseid = $("#base").data('base');*/


        if (isvalid) {
            var login = {
                email: email_val,
                password: password_val
            };

            //$.ajax({

            //    /* url: baseid +"api/CoostController/Login"*/
            //    url: 'https://localhost:7125/api/CoostController/Login',
        
            //     type: 'Post',
            //    data: (login),

            //    success: function (result) {
            //        alert("Login successfully");
            //        window.location.href = '/CostHeadController1/ListPage';
               
                success: function (result) {
                    alert("Successfully submitted");
                    window.location.href = '/CostHeadController1/ListPage';

            //    }
            //});


            $.ajax({
                url: 'https://localhost:7125/api/CoostController/Login',
                type: 'POST',
                data: login,
                success: function (result) {
                    alert("Login successfully");
                    window.location.href = '/CostHeadController1/ListPage';
                },
                error: function (xhr, status, error) {
                    if (xhr.status === 401) {
                        alert("Invalid email or password.");
                    } else {
                        alert("An error occurred: " + xhr.responseText);
                }
                }
            });


            //alert("Login successfully")
            //$("#LoginPage")[0].submit();
        }
















        $(document).ready(function () {
            $('#forgotPasswordLink').click(function (e) {
                e.preventDefault(); // Prevent the default hyperlink behavior

                email = $(idreferences.emaildata).val()
                if (email !== null) {
                    // Send the email to the server
                    $.ajax({
                        url: '@Url.Action("ForgetPassword", "Account")',
                        method: 'POST',
                        data: { email: email },
                        success: function (response) {
                            // Handle the response from the server if needed
                            console.log(response);
                        },
                        error: function (xhr, status, error) {
                            // Handle errors if any
                            console.error(error);
                        }
                    });
                }
            });
        });


    });
});




















































