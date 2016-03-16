$(document).ready(function() {
  $("nav").on("click", "#login-link, #register-link", function(event) {
    event.preventDefault();
    $.get(event.currentTarget.href).done(function(response) {
      $("#login-container").html(response);
    }).fail(function(response) {
      console.log("sessions/new failure?", response);
    });
  });

  $("nav").on("click", "#logout-link", function(event) {
    event.preventDefault();
    var link = event.currentTarget;
    $.ajax({
      dataType: "json",
      method: "DELETE",
      url: link.href
    }).done(function(response) {
      $("nav").html(response.userNav);
    }).fail(function(response) {
      console.log("sessions#destroy failure?", response);
    });
  });

  $("#login-container").on("submit", "form", function(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    var form = event.currentTarget;
    $.ajax({
      data: $(form).serialize(),
      dataType: "json",
      method: form.method,
      url: form.action
    }).done(function(response) {
      console.log("sessions/create success!", response);
      if(response.errors) {
        $("#form-errors").empty();
        response.errors.forEach(function(message) {
          $("#form-errors").append(message);
        })
      }
      else if(response.userNav) {
        $("#login-container").empty();
        $("nav").html(response.userNav);
      }
    }).fail(function(response) {
      console.log("sessions/create failure?", response);
    });
  });
});
