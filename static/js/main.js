$(document).ready(function () {
    // Initialization: Hide interactive layout panels on load
    $('.image-section').hide();
    $('.loader').hide();
    $('#result-section').hide();

    // Upload Preview Handler
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // target the internal preview div for background mapping matching main.css
                $('#preview-div').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Trigger preview when file input changes
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result-section').hide(); // Reset metrics panel on new upload
        readURL(this);
    });

    // Execute Inference via AJAX Asynchronous Pipeline
    $('#btn-predict').click(function () {
        // Capture the form element wrapper containing the file binary
        var form_data = new FormData($('#upload-form')[0]);

        // Toggle UI loading configurations
        $(this).hide();
        $('.loader').show();

        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Stop the spinner animation
                $('.loader').hide();
                
                if (data.success) {
                    // Inject structured JSON parameters safely into the HTML target elements
                    $('#prediction-text').text(data.prediction);
                    $('#confidence-text').text(data.confidence);
                    
                    // Reveal the updated metrics container smoothly
                    $('#result-section').fadeIn(600);
                } else {
                    alert('Analysis Error: ' + (data.error || 'Unknown failure.'));
                    $('#btn-predict').show();
                }
                console.log('Inference sequence finalized successfully.');
            },
            error: function (xhr, status, error) {
                $('.loader').hide();
                $('#btn-predict').show();
                
                // Read error payload message if parsed properly by the Flask backend exception handling catch
                var errorMsg = xhr.responseJSON ? xhr.responseJSON.error : 'Network transaction crash.';
                alert('Server Error: ' + errorMsg);
            }
        });
    });
});
