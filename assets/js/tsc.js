$(document).ready(function () {
    // Function to check if a paragraph height exceeds 14rem
    function checkParagraphHeight() {
        $('#module .testimonial-item').each(function () {
        var para = $(this).find('p');
        var button = $(this).find('.collapsed');

        // Get the scroll height of the paragraph (fully expanded height)
        var paraHeight = para[0].scrollHeight;
        console.log(paraHeight);

        if (paraHeight > 240) {
            button.show(); // Show 'Read More' if paragraph height exceeds 240px
        } else {
            button.hide(); // Hide 'Read More' if paragraph is shorter than 240px
        }
        });
    }

    // Check paragraph height on page load
    checkParagraphHeight();

    // Re-check after collapse toggle
    $('#module a[data-toggle="collapse"]').on('click', function () {
        setTimeout(checkParagraphHeight, 300); // Delay for collapse transition to complete
    });
});
