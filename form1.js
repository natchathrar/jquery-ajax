let list = [];
let student = {};
$(document).ready(function () {
    var editId = null;
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    $('#form1').submit(function get(event) {
        event.preventDefault();
        var id = $("#id").val();
        var username = $("#names").val();
        var email = $("#email").val();
        var password = $("#pwd").val();

        function isValidEmail(email) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        }

        var isvalid = true;
        if (!username) {
            $("#err").text("* Please Enter Your Name");
            isvalid = false;
        } else {
            $("#err").text("");
        }
        if (!email) {
            $("#err1").text("* Please Enter Your email");
            isvalid = false;
        } else if (!isValidEmail(email)) {
            $('#err1').text('Please enter a valid email address.');
            isvalid = false;
        } else {
            $("#err1").text("");
        }
        if (!password) {
            $("#err2").text("* Please Enter Your password");
            isvalid = false;
        } else if (password.length < 6) {
            $("#err2").text("** Password must be 6 characters.");
            isvalid = false;
        } else {
            $("#err2").text("");
        }

        if (isvalid) {
            let result = {
                'Names': username,
                'Email': email,
                'Password': password
            };
            console.log(result);
            if (username && email && password) {
                list.push(result);
            }
            if (id == "") {
                $.ajax({
                    type: "POST",
                    url: "https://63ef516e271439b7fe6c0386.mockapi.io/user",
                    data: result,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        table()
                        location.reload()
                    }

                })
            }
            else {
                $.ajax({
                    type: "PUT",
                    url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + student.id,
                    data: result,
                    dataType: "JSON",
                    endcode: true,
                    success: function () {
                        location.reload()
                    }

                })
            }

        }
    });

});

function table() {

    $.ajax({
        type: "GET",
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user",
        dataType: "JSON",
        success: function (response) {
            let list = response

            // list = JSON.parse(localStorage.getItem("resi"));
            console.log(list)
            var count = 1;
            for (let i = 0; i < list.length; i++) {

                let row =
                    "<td>" + count++ + "</td>"
                    + "<td>" + list[i].Names + "</td>"
                    + "<td>" + list[i].Email + "</td>"
                    + "<td>" + list[i].Password + "</td>"
                    + "<td>" + "<button type='button' class='edit text-white btn btn-sm btn-success' data-id=" +

                    list[i].id + ">Edit</button><button type='button' class='deleteRow btn btn-sm btn-danger ms-2' onclick='deleteRow (" +

                    list[i].id + ")'>Delete</button> " + "</td>"


                document.getElementById("table").innerHTML += row;
            }
        }
    })
}
$(document).on('click', '.edit', function () {
    var id = $(this).data('id');
    $.ajax({
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + id,
        type: "GET",
        success: function (response) {
            $("#id").val(response.id);
            $("#names").val(response.Names);
            $("#email").val(response.Email);
            $("#pwd").val(response.Password);
            student = response;

        }
    })
})
function deleteRow(id) {
    $.ajax({
        url: "https://63ef516e271439b7fe6c0386.mockapi.io/user/" + id,
        type: "DELETE",
        success: function (response) {
            location.reload()


        }
    })
}


