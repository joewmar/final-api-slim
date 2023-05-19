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
function getAllRecord(){
        $.ajax({
            url: "http://final-api-slim.test/students",
            method: "GET", 
            contentType: "application/json",
            success: function(response) {
                txt = "";
                for(var item of response){
                    txt += 
                    `
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.firstname}</td>
                        <td>${item.middlename}</td>
                        <td>${item.lastname}</td>
                        <td>${item.address}</td>
                        <td>${item.birthday}</td>
                        <td>${item.course}</td>
                        <td>${item.yearlevel}</td>
                        <td>
                            <a href="student.html?id=${item.id}" class="btn btn-outline-dark btn-sm">More Details</a>
                        </td>
                    </tr>
                    
                    `;
                    document.getElementById("api").innerHTML = txt;
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                console.log(err.Message);
            }
        });
}

function addRecord(){
    var data = {
        firstname : document.getElementById("firstname").value,
        middlename : document.getElementById("middlename").value,
        lastname : document.getElementById("lastname").value,
        address : document.getElementById("address").value,
        birthday : formatDate(document.getElementById("birthday").value),
        course : document.getElementById("course").value,
        yearlevel : document.getElementById("year").value,
    }
    $(document).ready(function() {
        $.ajax({
            url: "http://final-api-slim.test/students/add",
            method: "POST", 
            data: JSON.stringify(data),
            success: function(response) {
                var txtAlert = "";
                txtAlert += 
                `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> ${response["messages"]}.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                
                `;
                // Go back to Top
                $('html, body').animate({ scrollTop: 0 }, 'fast');
                document.getElementById("apiAlert").innerHTML = txtAlert;
                getAllRecord();

                // Clear All Text
                document.getElementById("firstname").value = "";
                document.getElementById("middlename").value = "";
                document.getElementById("lastname").value = "";
                document.getElementById("address").value = "";
                document.getElementById("birthday").value = "";
                document.getElementById("course").value = "";
                document.getElementById("year").value = 1;
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                console.log(err.Message);
            }
        })
    });
}
$(document).ready(function() {
    getAllRecord();
});