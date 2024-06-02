
var RegisterIds = {
    Name: "#name",
    NameError: "#nameError",
    NameErrorIcon: "#nameErrorIcon",
    Email: "#email",
    EmailError: "#emailError",
    EmailErrorIcon: "#emailErrorIcon",
    Password: "#password",
    PasswordError: "#passwordError",
    PasswordErrorIcon: "#passwordErrorIcon",
    ConfirmPassword: "#confirmPassword",
    ConfirmPasswordError: "#confirmPasswordError",
    ConfirmPasswordErrorIcon: "#confirmPasswordErrorIcon"

};

$(document).ready(function () {

    $(RegisterIds.Name).on('input', function () {
        var name = $(this).val();
        if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name)) {
            $(RegisterIds.NameError).text('Name should only contain alphabetic characters').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            $(RegisterIds.NameErrorIcon).show();
        } else {
            $(RegisterIds.NameError).hide();
            if (name.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(RegisterIds.NameErrorIcon).hide();
            } else {
                $(this).removeClass('is-valid is-invalid');
                $(RegisterIds.NameErrorIcon).hide();
            }
        }
    });



    $(RegisterIds.Email).on('input', function () {
        var email = $(this).val();
        if (!/^[a-z]{1}[a-z0-9]+@gmail.com$/.test(email)) {
            $(RegisterIds.EmailError).text('Enter a valid email address').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            $(RegisterIds.EmailErrorIcon).show();
        } else {
            $(RegisterIds.EmailError).hide();
            if (email.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(RegisterIds.EmailErrorIcon).hide();
            } else {
                $(this).removeClass('is-valid is-invalid');
                $(RegisterIds.EmailErrorIcon).hide();
            }
        }
    });


    // Clear password error message and styling on input
    $(RegisterIds.Password).on('input', function () {
        var password = $(this).val();
        if (!/^.{4,15}$/.test(password)) { // Check if password length is between 4 and 15 characters
            $(RegisterIds.PasswordError).text('Password must be between 4 and 15 characters long').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            $(RegisterIds.PasswordErrorIcon).show();
        } else {
            $(RegisterIds.PasswordError).hide();
            if (password.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(RegisterIds.PasswordErrorIcon).hide();
            } else {
                $(this).removeClass('is-valid is-invalid');
                $(RegisterIds.PasswordErrorIcon).hide();
            }
        }
    });
    $(RegisterIds.ConfirmPassword).on('input', function () {
        var confirmPassword1 = $(this).val();
        var password1 = $(RegisterIds.Password).val();
        if (confirmPassword1 != password1) {
            $(RegisterIds.ConfirmPasswordError).text('Password is not matched').show();
            $(this).removeClass('is-valid').addClass('is-invalid');
            $(RegisterIds.ConfirmPasswordErrorIcon).show();
        }
        else {
            $(RegisterIds.ConfirmPasswordError).hide();
            if (confirmPassword1.trim() !== '') {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(RegisterIds.ConfirmPasswordErrorIcon).hide();
            }
            else {
                $(this).removeClass('is-valid is-invalid');

            }
        }

    });



    //here Form submiting Event
    $('#registrationForm').submit(function (event) {

        console.log('test');
        event.preventDefault();
        // Perform validation
        var isValid = validateForm();
        // If all fields are valid, submit the form
        if (isValid) {
            this.submit();
        }
    });
    function validateForm() {
        // Get input values

       
        
            var name = $(RegisterIds.Name).val();
            var email = $(RegisterIds.Email).val();
            var password = $(RegisterIds.Password).val();
            var confirmPassword = $(RegisterIds.ConfirmPassword).val();
        // Reset error messages




        var Register = {

            name: $(RegisterIds.Name).val(),
            email: $(RegisterIds.Email).val(),
            password: $(RegisterIds.Password).val(),
            confirmPassword: $(RegisterIds.ConfirmPassword).val(),

        };


        
 
        $('.invalid-feedback').hide();
        // Flag to track form validity
        var isValid = true;
        // Validate name
        if (!name) {
            $(RegisterIds.NameError).text('Name is required').show();
            $(RegisterIds.NameErrorIcon).show();

            isValid = false;
        } else if (!/^[a-zA-Z]+$/.test(name)) { // Check if name contains only alphabetic characters
            $(RegisterIds.NameError).text('Name should only contain alphabetic characters').show();
            $(RegisterIds.NameErrorIcon).show();
            isValid = false;
        }
        // Validate email
        if (!email) {
            $(RegisterIds.EmailError).text('Email is required').show();
            $(RegisterIds.EmailErrorIcon).show();
            isValid = false;
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) { // Check if email has valid format
            $(RegisterIds.EmailError).text('Enter a valid email address').show();
            $(RegisterIds.EmailErrorIcon).show();
            isValid = false;
        }
        // Validate password
        if (!password) {
            $(RegisterIds.PasswordError).text('Password is required').show();
            $(RegisterIds.PasswordErrorIcon).show();
            isValid = false;
        }
        // Validate confirm password
        if (!confirmPassword) {
            $(RegisterIds.ConfirmPasswordError).text('Confirm Password is required').show();
            $(RegisterIds.ConfirmPasswordErrorIcon).show();
            isValid = false;
        } else if (confirmPassword !== password) {
            $('#confirmPasswordError').text('Passwords do not match').show();
            $(RegisterIds.ConfirmPasswordErrorIcon).show();
            isValid = false;
        }

        //$('#btnReister').on('click', function () {


        //    alert('Registration Succussfully');
        //});


       
        $.ajax({
            url: 'https://localhost:7125/api/CoostController/Register',

            type: 'Post',
            data:(Register),

            success: function (result) {
                alert(" Registration Successfully ");
                window.location.href = '/CostHeadController1/Login';



            },
             error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error(error);
                console.error(status);
            }

        });

        return isValid;





    }
});









