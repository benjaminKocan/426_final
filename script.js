var root_url = "http://comp426.cs.unc.edu:3001/";

$(document).ready(() => {
    $('#login_btn').on('click', () => {

        let user = $('#user').val();
        let pass = $('#pass').val();

        console.log(user);
        console.log(pass);

        $.ajax(root_url + "sessions",
            {
                type: 'POST',
                xhrFields: {withCredentials: true},
                data: {
                    user: {
                        username: user,
                        password: pass
                    }
                },
                success: () => {
                    alert('fuck yo couch');
                    build_airlines_interface();
                },
                error: (jqxhr, status, error) => {
                    alert(error);
                }
            });
    });

    $('#sign_up_btn').on('click', () => {
        let fname = $('#firstName').val();
        let lname = $('#lastName').val();
        // let email = $('#email').val();
        let password = $('#password').val();

        console.log(fname);
        console.log(lname);

        $.ajax(root_url + "users",
            {
                type: 'POST',
                xhrFields: {withCredentials: true},
                data: {
                    user: {
                        username: fname,
                        password: password
                    }
                },
                success: () => {
                    alert('fuck yo shit');
                    build_airlines_interface();
                },
                error: (jqxhr, status, error) => {
                    alert(error);
                }
            });
    });

});

var build_airlines_interface = function() {
    let body = $('body');

    body.empty();

    body.append('<h1 class="pageHeader">Find Your Airline</h1>');
    let navbar_div = $('<div class="navbar_div"></div>');
    body.append(navbar_div);
    let navbar = $('<nav class="navbar" id="navbar"></nav>');
    body.append(navbar);
    $('#navbar').append('<button class="navbar-item" id="redItem" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<div class="spacingDiv"></div>');
    body.append('<input class="searchBar" type="text" id="search_text" placeholder="Search Airlines">');
    body.append('<button class="searchButton" onclick="airlines_filter_function()">Search</button>');
    body.append('<div class="smallerSpacingDiv"></div>');


    let airlines_table = $('<table class="pageTable"" id="airlines_table"></table>');
    airlines_table.append('<tr><td>Airline</td><td>ID</td></tr>');
    body.append(airlines_table);
    body.append('<div class="smallerSpacingDiv"></div>');

    let airline_add_div = $("<div class='newSomethingTitle'>New Airline Name: <input id='new_airline_name' type='text' placeHolder='Enter Airline Here'><br>");

    body.append(airline_add_div);

    body.append("<button class='createButton' id='make_airline'>Create</button></div>");

    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');

    $.ajax(root_url + "airlines",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airlines) => {
                for (let i=0; i<airlines.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + airlines[i].name + "</td>");
                    row.append("<td>"+ airlines[i].id + "</td>");
                    airlines_table.append(row);
                }
            }
        });

    $('#make_airline').on('click', () => {
        let airline_name = $('#new_airline_name').val();

        $.ajax(root_url + "airlines",
            {
                type: 'POST',
                data: {
                    airline: {
                        name: airline_name
                    }
                },
                xhrFields: {withCredentials: true},
                success: (airlines) => {
                    build_airlines_interface();
                    }
            });
    });

};

var make_flights_page = function () {
    let body = $('body');
    body.empty();
    body.append('<h1 class="pageHeader">Flights</h1>');
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" id="redItem" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');
    body.append('<div class="spacingDiv"></div>');


    let flights_table = $('<table class="pageTable" id="flight_list"></table>');
    flights_table.append('<tr><td>Number</td><td>Departure Time</td><td>Arrival Time</td></tr>');
    body.append(flights_table);

    body.append('<div class="smallerSpacingDiv"></div>');

    let flight_add_div = $("<div class='newSomethingTitle'>New Flight Name: <input id='flight_name' type='text' placeHolder='Enter Flight Here'><br>");

    body.append(flight_add_div);

    body.append("<button class='createButton' id='make_airline'>Create</button></div>");

    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');

    $.ajax(root_url + "flights",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (flights) => {
                for (let i=0; i<flights.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + flights[i].number + "</td>");
                    row.append("<td>"+ flights[i].departs_at.substring(11,16) + "</td>");
                    row.append('<td>' + flights[i].arrives_at.substring(11,16) + '</td>');
                    flights_table.append(row);
                }
            }
        });
};

var make_tickets_page = function () {
    let body = $('body');
    body.empty();
    body.append('<h1 class="pageHeader">Tickets</h1>');
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    let tickets_table = $("<table id='tickets_table'></table>");
    tickets_table.append('<tr><td>Number</td><td>Departure Time</td><td>Arrival Time</td></tr>');
    body.append(tickets_table);

    let tickets_add_div = $("<div>Name: <input id='new_ticket_name' type='text'><br>" +
        "<button id='make_ticket'>Create</button></div>");
    body.append(tickets_add_div);

    $.ajax(root_url + "flights",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (flights) => {
                for (let i=0; i<flights.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + flights[i].number + "</td>");
                    row.append("<td>"+ flights[i].departs_at.substring(11,16) + "</td>");
                    row.append('<td>' + flights[i].arrives_at.substring(11,16) + '</td>');
                    flights_table.append(row);
                }
            }
        });
    $('#navbar').append('<button class="navbar-item" id="redItem" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<div class="spacingDiv"></div>');

    let tickets_table = $('<table class="pageTable" id="tickets_table"></table>');
    tickets_table.append('<tr><td>First Name</td><td>Middle Name</td><td>Last Name</td><td>Age</td><td>Gender</td><td>Price Paid</td><td>ID</td></tr>');
    body.append(tickets_table);

    let ticket_add_div = $("<div class='newSomethingTitle'>Name: <input id='f_name' type='text' placeHolder='First Name'><input id='l_name' type='text' placeHolder='Last Name'><br>");
    body.append(ticket_add_div);

    body.append("<button class='createButton' id='make_airline'>Create</button></div>");
    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');

    $.ajax(root_url + "tickets",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (tickets) => {
                for (let i=0; i<tickets.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + tickets[i].first_name + "</td>");
                    row.append("<td>"+ tickets[i].middle_name + "</td>");
                    row.append('<td>' + tickets[i].last_name + '</td>');
                    row.append('<td>' + tickets[i].age + '</td>');
                    row.append('<td>' + tickets[i].gender + '</td>');
                    row.append('<td>' + tickets[i].price_paid + '</td>');
                    row.append('<td>' + tickets[i].seat_id + '</td>');
                    tickets_table.append(row);
                }
            }
        });

    $('#make_ticket').on('click', () => {
        let f_name = $('#f_name').val();
        let l_name = $('#l_name').val();

        console.log(f_name);
        console.log(l_name);

        $.ajax(root_url + "tickets",
            {
                type: 'POST',
                data: {
                    "ticket": {
                        "first_name":   f_name,
                        "middle_name":  "west",
                        "last_name":    l_name,
                        "age":          "24",
                        "gender":       "male",
                        "is_purchased": true,
                        "price_paid":   "291",
                        "instance_id":  undefined,
                        "itinerary_id": undefined,
                        "seat_id":      undefined,
                        "info":         ""
                    }
                },
                xhrFields: {withCredentials: true},
                success: (tickets) => {
                    for (let i=0; i<tickets.length; i++) {
                        let row = $('<tr></tr>');
                        row.append("<td>" + tickets[i].first_name + "</td>");
                        row.append("<td>"+ tickets[i].middle_name + "</td>");
                        row.append("<td>"+ tickets[i].last_name + "</td>");
                        row.append("<td>"+ tickets[i].age + "</td>");
                        row.append("<td>"+ tickets[i].gender + "</td>");
                        tickets_table.append(row);
                    }
                }
            });
    });
};

var make_airports_page = function () {
    let body = $('body');
    body.empty();
    body.append('<h1 class="pageHeader">Find Airports</h1>');
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" id="redItem" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<div class="spacingDiv"></div>');

    body.append('<input class="searchBar" type="text" id="airport_code" placeholder="Search Airports By Code">');
    body.append('<button class="searchButton" onclick="airport_filter_function()">Search</button>');

    let airports_table = $('<table class="pageTable" id="airports_table"></table>');
    airports_table.append('<tr><td>Name</td><td>City</td><td>Code</td></tr>');
    body.append(airports_table);
    
    body.append('<div class="smallerSpacingDiv"></div>');
    
    let airport_add_div = $("<div class='newSomethingTitle'>New Airport Name: <input class='searchBar' id='new_airport_name' type='text' placeHolder='Enter Aiport Name Here'><br>");

    body.append(airport_add_div);
    body.append("<button class='createButton' id='make_airport'>Create</button></div>");
    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');

    $.ajax(root_url + "airports",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airports) => {
                for (let i=0; i<airports.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + airports[i].name + "</td>");
                    row.append("<td>"+ airports[i].city + "</td>");
                    row.append('<td>' + airports[i].code + '</td>');
                    airports_table.append(row);
                }
            }
        });
};

var airport_filter_function = function () {
    let body = $('body');
    let airp_code = $('#airport_code').val();

    body.empty();

    body.append("<h2>Airports</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<input type="text" id="airport_code" placeholder="Search Airports By Code">');
    body.append('<button class="search_butt" onclick="airport_filter_function()">Search</button>');

    let airports_table = $("<table id='airlines_table'></table>");
    airports_table.append('<tr><td>Name</td><td>City</td><td>Code</td></tr>');
    body.append(airports_table);
    
    let airport_add_div = $("<div class='newSomethingTitle'>New Airport Name: <input class='searchBar' id='new_airport_name' type='text' placeHolder='Enter Aiport Name Here'><br>");

    body.append(airport_add_div);
    body.append("<button class='createButton' id='make_airport'>Create</button></div>");
    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');


    $.ajax(root_url + 'airports?filter[code]=' + airp_code,
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airports) => {
                for (let i=0; i <airports.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + airports[i].name + "</td>");
                    row.append("<td>"+ airports[i].city + "</td>");
                    row.append('<td>' + airports[i].code + '</td>');
                    airports_table.append(row);
                }
            }
        }
    )
};

var airlines_filter_function = function () {
    let body = $('body');
    let sear_text = $('#search_text').val();

    console.log(sear_text);

    body.empty();

    body.append("<h1 class='pageHeader'>Find Airlines</h1>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" id="redItem" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<input class="searchBar" type="text" id="search_text" placeholder="Search Airlines">');
    body.append('<button class="searchButton" onclick="airlines_filter_function()">Search</button>');

    let airlines_table = $('<table class="pageTable" id="airlines_table"></table>');
    airlines_table.append('<tr><td>Name</td><td>ID</td></tr>');
    body.append(airlines_table);

    let airline_add_div = $("<div class='newSomethingTitle'>New Airline Name: <input id='new_airline_name' type='text' placeHolder='Enter Airline Here'><br>");

    body.append(airline_add_div);

    body.append("<button class='createButton' id='make_airline'>Create</button></div>");

    body.append('<div class="smallerSpacingDiv"></div>');

    body.append('<button class="logoutButton" type="logout_Btn" onclick="logout()">Log Out</button>');
    
    $.ajax(root_url + 'airlines?filter[name]=' + sear_text,
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airlines) => {
                for (let i=0; i<airlines.length; i++) {
                    let row = $('<tr></tr>');
                    row.append("<td>" + airlines[i].name + "</td>");
                    row.append("<td>"+ airlines[i].id + "</td>");
                    airlines_table.append(row);
                }
            }
        }
    )
};

var logout = function () {
    $.ajax({
        url: root_url + '/sessions',
        type: 'DELETE',
        xhrFields: { withCredentials: true },
        success: (response) => {
            alert('you have logged out');
            location.reload(true);
        }
    });
};



var get_weather = function () {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?zip='+ zip + '&units=imperial&APPID=c10a7fa753e41cd5f5c3302bf971968e',
        type: 'GET',
        xhrFields: {withCredentials: true},
        success: (response) => {
            if(response.status) {
                alert('weather');
            }
        }
    });

}