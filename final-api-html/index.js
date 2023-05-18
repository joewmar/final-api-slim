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
                alert(err.Message);
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
                getAllRecord();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");                    
                alert(err.Message);
            }
        })
    });
}
$(document).ready(function() {
    getAllRecord();
});