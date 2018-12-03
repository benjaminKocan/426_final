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
});

var build_airlines_interface = function() {
    let body = $('body');

    body.empty();

    body.append("<h2>Airlines</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<input type="text" id="search_text" placeholder="Search Airlines">');
    body.append('<button class="search_butt" onclick="airlines_filter_function()">Search</button>');

    let airlines_table = $("<table id='airlines_table'></table>");
    airlines_table.append('<tr><td><em>Name</em></td><td><em>ID</em></td></tr>');
    body.append(airlines_table);

    let airline_add_div = $("<div>Name: <input id='new_airline_name' type='text'><br>" +
        "<button id='make_airline'>Create</button></div>");

    body.append(airline_add_div);

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
                success: (airline) => {
                    airline_list.append("<li>" + airline.name + "</li>");
                }
            });
    });

};

var make_flights_page = function () {
    let body = $('body');
    body.empty();
    body.append("<h2>Flights</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    let flights_table = $("<table id='flight_list'></table>");
    flights_table.append('<tr><td>Number</td><td>Departure Time</td><td>Arrival Time</td></tr>');
    body.append(flights_table);

    let flight_add_div = $("<div>Name: <input id='new_flight_name' type='text'><br>" +
        "<button id='make_flight'>Create</button></div>");

    body.append(flight_add_div);

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
    body.append("<h2>Tickets</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');
};

var make_airports_page = function () {
    let body = $('body');
    body.empty();
    body.append("<h2>Airports</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    let airport_list = $("<ul id='airport_list'></ul>");
    body.append(airport_list);

    let airport_add_div = $("<div>Name: <input id='new_airport_name' type='text'><br>" +
        "<button id='make_airport'>Create</button></div>");

    body.append(airport_add_div);

    $.ajax(root_url + "airports",
        {
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (airports) => {
                for (let i=0; i<airports.length; i++) {
                    airport_list.append("<li>" + airports[i].name + "</li>");
                }
            }
        });
};

var airlines_filter_function = function () {
    let body = $('body');
    let sear_text = $('#search_text').val();

    console.log(sear_text);

    body.empty();

    body.append("<h2>Airlines</h2>");
    body.append('<nav class="navbar" id="navbar"></nav>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="build_airlines_interface()">Airlines</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_airports_page()">Airports</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_flights_page()">Flights</button>');
    $('#navbar').append('<button class="navbar-item" type="navBtn" onclick="make_tickets_page()">Tickets</button>');

    body.append('<input type="text" id="search_text" placeholder="Search Airlines">');
    body.append('<button class="search_butt" onclick="airlines_filter_function()">Search</button>');

    let airlines_table = $("<table id='airlines_table'></table>");
    airlines_table.append('<tr><td>Name</td><td>ID</td></tr>');
    body.append(airlines_table);

    let airline_add_div = $("<div>Name: <input id='new_airline_name' type='text'><br>" +
        "<button id='make_airline'>Create</button></div>");

    body.append(airline_add_div);

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



