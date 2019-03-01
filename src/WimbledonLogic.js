function search() {
    var json = getjson();
    $.getJSON("wimbledon-men-2013.json", function (json) {
        $.each(json, function (key, value)
        {
            // alert(i + " " +  obj.toString()
            // )
            read(key, value)
        })

    })

        

    // $.each(json.)
}
function getjson() {
    return $.getJSON( "wimbledon-men-2013.json");
}

function read(key, value)
{
    alert(key + " " +  value)
    if (key === "match") {
        var matches = $.each(value, function (k1, v1) {
            // $.each(v, function (k1, v1) {
            //     read(k1, v1)
            //
            // })
            matchnumber = k1
            match = v1

        })
    }
}

function buildMatchRows(round, players)
{

}

// function tableOfSquares() {
// // Display a prompt with a zero in it
//     var num = window.prompt("Enter an integer", "0");
//     var myTable = "<table class='border figure'>";
//     var count = 0;
//     while(count < num) {
//         // Each row of the table is an integer and its square
//         myTable = myTable + "<tr><td>" + count + "</td><td>"
//             + count*count + "</td></tr>";
//         count++;
//     }
//     document.getElementById("tos").innerHTML = myTable + "</table>";
// }