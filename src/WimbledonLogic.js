function search() {
    var json = getjson();
    $.getJSON("wimbledon-men-2013.json", function (json) {
        $.each(json, function (key, value)
        {
            read(key, value)
        })
    })
}


function read(key, value)
{
    alert(key + " " +  value)
    if (key === "match") {
        $.each(value, function (k1, v1) {
            matchnumber = k1
            match = v1
            buildMatchRows(match)

        })
    }
}

function buildMatchRows(match)
{
    var row1 = "<tr><td>"
    var row2 = "<tr><td>"
    $.each(match, function (k, v) {
        if (k === "round") {row1 += v; row2 += v}
        if (k === "player") {
            $.each(v, function (playernumber, playerdata) {

                if (playernumber === 0)
                {
                    buildRow(row1, playerdata)
                }
                else {
                    buildRow(row2, playerdata)
                }
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

