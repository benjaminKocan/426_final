//global variables
var root_url = "http://comp426.cs.unc.edu:3001/";

//jquery on load functionality
$(document).ready(() => {
    $('#login_butt').on('click', () => {

        let user = $('#login_user').val();
        let pass = $('#login_pass').val();

        console.log(user);
        console.log(pass);

        $.ajax({
            url: root_url + 'sessions',
            type: 'POST',
            data: {
                "user": {
                    "username": user,
                    "password": pass
                }
            },
            xhrFields: { withCredentials: true },
            success: (response) => {
                if (response.status) {
                    console.log('it works');
                }
            },
            error: () => {
                alert("error");
;            }
        });
    });

});