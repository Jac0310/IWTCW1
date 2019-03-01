function search() {
    var source = document.getElementById("gender").value
    clearResults();
    $.getJSON(source, function (json) {
        $.each(json, function (key, value)
        {
            read(key, value)
        })
    })
}
function clearResults()
{
    $(document).ready(function() {
        $("#display").find("tr:gt(0)").remove();
    });
}


function read(key, value)
{
    var blankRow = "<tr><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td></tr>"
    if (key === "match") {
        $.each(value, function (matchnumber, match) {
            buildMatchRows(match)
            $("#display").append(blankRow) //seperate matches
        })
    }
}

function buildMatchRows(match)
{
    var row = "<tr><td>"
    $.each(match, function (k, v) {
        if (k === "round") { row += v}
        if (k === "player") {
            $.each(v, function (playernumber, playerdata) {
                buildRow(row, playerdata)
            })
        }
    })
}

function buildRow(row, playerdata)
{
    row += "</td><td>"
    $.each(playerdata, function (k,v) {

        if (k === "name") { row += v};
        if (k === "set") {
            var i;
            for ( i = 0; i < v.length; i++)
            {
                row += "</td><td>" + v[i];
            }
        }
    })
    row += "</td><tr>"
    $("#display").append(row)
}

