 $(function() { 
        var form = $('#appointment_form');
        var formMessages = $('#msg-status');
        var subscribeCheckbox = $('#subscribe');
        var alreadySubscribedCheckbox = $('#already_subscribed');

        // Prevent both checkboxes from being selected simultaneously
        subscribeCheckbox.on('change', function() {
            if (subscribeCheckbox.is(':checked')) {
                alreadySubscribedCheckbox.prop('checked', false);
            }
        });

        alreadySubscribedCheckbox.on('change', function() {
            if (alreadySubscribedCheckbox.is(':checked')) {
                subscribeCheckbox.prop('checked', false);
            }
        });

        form.submit(function(event) {
            event.preventDefault(); // Prevent the default form submission

            var formData = form.serialize(); // Serialize form data

            // If "Subscribe" is checked and "Already Subscribed" is not checked, submit to the subscription form first
            if (subscribeCheckbox.is(':checked') && !alreadySubscribedCheckbox.is(':checked')) {
                var email = $('#email_field').val();
                $.ajax({
                    type: 'POST',
                    url: 'https://docs.google.com/forms/d/e/1FAIpQLSe1R6shJuHshDwWj4c-tGM7XFD4Q0caUandwSOAI-_DLR95iQ/formResponse',
                    data: { "entry.743101501": email }
                }).done(function() {
                    // After successful subscription, proceed to appointment submission
                    submitAppointmentForm(formData);
                }).fail(function() {
                    // Even if subscription fails, proceed to appointment submission
                    submitAppointmentForm(formData);
                });
            } else {
                // Directly submit the appointment form if subscription is not required
                submitAppointmentForm(formData);
            }
        });

        // Function to submit the appointment form without redirecting
        function submitAppointmentForm(formData) {
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData
            }).done(function(response) {
                $(formMessages).removeClass('alert-danger').addClass('alert-success').text('Your appointment has been successfully scheduled!');
                // Clear form fields
                $('#app_name, #email_field, #app_phone, #app_free_time, #appointment_date').val('');
                $('#app_services').prop('selectedIndex', 0);
                subscribeCheckbox.prop('checked', false);
                alreadySubscribedCheckbox.prop('checked', false);
            }).fail(function() {
                $(formMessages).removeClass('alert-danger').addClass('alert-success').text('Your appointment has been successfully scheduled!');
            });
        }

        // Set minimum date for appointment date input to today
        var today = new Date().toISOString().split("T")[0];
        document.getElementById("appointment_date").setAttribute("min", today);
    });