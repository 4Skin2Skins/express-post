(function () {

  function init(){
    $('#submitButton').click(submitButtonHandler);
  }

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');


      //make the AJAX call
      $.ajax({
        url: '/form',
        type: 'POST',
        data: {
          firstName: testForm.firstName.value,
          lastName: testForm.lastName.value
        },
        success: postSuccessHandler
      });
  }

  function postSuccessHandler (jsonData) {
    console.log('POSTED!')
  };

//init on document ready
$(document).ready(init);
})();