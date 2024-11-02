$(function() {
    var form = $('#appointment_form');
    var formMessages = $('#msg-status');

    $(form).submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        var formData = $(form).serialize(); // Serialize form data

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            // Display success message regardless of response
            $(formMessages).removeClass('alert-danger');
            $(formMessages).addClass('alert-success');
            $(formMessages).text('Your appointment has been successfully scheduled!');
            
            // Clear form fields
            $('#app_name').val('');
            $('#app_email').val('');
            $('#app_phone').val('');
            $('#app_free_time').val('');
            $('#app_services').val('');
            $('#app_barbers').val('');
        }).fail(function(data) {
            // Also show the success message here, regardless of the error
            $(formMessages).removeClass('alert-danger');
            $(formMessages).addClass('alert-success');
            $(formMessages).text('Your appointment has been successfully scheduled!');

            // Optionally, you can log the error or handle it as needed
            console.error('Error occurred:', data);
        });
    });
});
// Set the minimum date for the appointment date input to today
    document.addEventListener("DOMContentLoaded", function() {
        var today = new Date().toISOString().split("T")[0];
        document.getElementById("appointment_date").setAttribute("min", today);
    });
