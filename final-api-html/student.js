function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const queryString = window.location.search; // Returns:'?id=1' in HTML URL
const params = new URLSearchParams(queryString); // Search URL paramerter
const id = params.get("id"); // is the number of id like 1 and so on

// GET one record
$(document).ready(function() {
    $.ajax({
        url: `http://final-api-slim.test/students/${id}`,
        type: "GET", 
        contentType: "application/json",
        success: function(response) {
            document.getElementById("studid").value = response[0].id;
            document.getElementById("firstname").value = response[0].firstname;
            document.getElementById("middlename").value = response[0].middlename;
            document.getElementById("lastname").value = response[0].lastname;
            document.getElementById("address").value = response[0].address;
            document.getElementById("birthday").value = response[0].birthday;
            document.getElementById("course").value = response[0].course;
            document.getElementById("year").value = response[0].yearlevel;
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            console.log(err.Message);
        }
    })
});

//PUT record
function updateRecord(){
    const studid = document.getElementById("studid").value;
    var data = {
        firstname : document.getElementById("firstname").value,
        middlename : document.getElementById("middlename").value,
        lastname : document.getElementById("lastname").value,
        birthday : formatDate(document.getElementById("birthday").value),
        address : document.getElementById("address").value,
        course : document.getElementById("course").value,
        yearlevel : document.getElementById("year").value,
    };
    $.ajax({
        url: `http://final-api-slim.test/students/edit/${studid}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");                    
            console.log('Error: ' + err.Message);
        }
    });
}

// DELETE Record
function deleteRecord(){
    const id = document.getElementById("studid").value;
    $(document).ready(function() {
        $.ajax({
            url: `http://final-api-slim.test/students/delete/${id}`,
            type: "DELETE", 
            contentType: "application/json; charset=utf-8",
            success: function(response) {

            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert('Error: ' + err.Message);
            }
        })
    });
}


