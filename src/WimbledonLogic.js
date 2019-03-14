
function search() {
    var source = document.getElementById("gender").value
    clearResults();
    var restrictions =setRestrictions();
    $.getJSON(source, function (json) {
        $.each(json, function (key, value)
        {
            read(key, value, restrictions)
        })
    })
}

function setRestrictions()
{
//set restrictions based on input constraints
    var nameRestrictionValue = $("#name").val().toLowerCase()
    var nameRestrictionOperator = $("#nameRestriction").val()
    var setRestrictionValue = $("#set").val()
    var setRestrictionOperator = $("#setRestriction").val()
    var roundRestrictionValue = $("#round").val()
    var roundRestrictionOperator = $("#roundRestriction").val()
    var restrictions = {
        "name" : {"value" : nameRestrictionValue, "operator" : nameRestrictionOperator},
        "set" : {"value" : setRestrictionValue, "operator" : setRestrictionOperator},
        "round" : {"value" : roundRestrictionValue, "operator" : roundRestrictionOperator}
    }
    return restrictions
}
function clearResults()
{
    $(document).ready(function() {
        $("#display").find("tr:gt(0)").remove();
    });
}


function read(key, value, restrictions)
{
    var blankRow = "<tr><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td><td>" + "---" + "</td></tr>"
    if (key === "match") {
        $.each(value, function (matchnumber, match) {
            if (matchPredicate(match, restrictions))
            {
                buildMatchRows(match)
                $("#display").append(blankRow) //seperate matches
            }
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
    var name;
    row += "</td><td>"
    $.each(playerdata, function (k,v) {
        if (k === "name") {
            row += v; name = v
        }
        else if (k === "set") {
            var i;
            for ( i = 0; i < v.length; i++)
            {
                row += "</td><td>" + v[i];
            }
        }
        else if (k === "outcome" &&  v === "won")
        {
           row = row.replace(name, "<b>" + name + "</b>")
        }
    })
    row += "</td><tr>"
    $("#display").append(row)
}

function matchPredicate(match, restrictions)
{
    var round = 0
    var name1 = ""
    var name2 = ""
    var sets = 0
    $.each(match, function (k, v) {
        var count = 0
        if (k === "round") {round = v}
        else {
            $.each(v, function(k, v)
            {
                count++;
                $.each(v, function(k, v)
                {
                    if (k === "name" && count ===1)
                    {
                        name1 = v
                    }
                    else if (k ==="name" && count ===2)
                    {
                        name2 = v
                    }
                    else if (k ==="set")
                    {
                        sets = v.length
                    }
                })
            })
        }

    })
    return (namePredicate(name1, restrictions) || namePredicate(name2, restrictions))
    && setPredicate(sets, restrictions)
    && roundPredicate(round, restrictions)
}


function setPredicate(set, restrictions)
{
    var sets = ""
    var filter = ""
    $.each(restrictions, function (k, v) {
        if (k === "set")
        {
            $.each(v, function (k, v) {
                if (k === "value")
                {
                    sets = v
                }
                else if (k === "operator")
                {
                    filter = v
                }
            })
        }
    })
    if (filter === "Equals")
    {
        set = "" + set; // bug why is sets  string?
        return set === sets
    }
    else if (filter === "Greater than")
    {
        return set > sets
    }
    else if (filter === "Less than")
    {
        return set < sets
    }
    return true;
}


function roundPredicate(round, restrictions)
{
    var rounds = ""
    var filter = ""
    $.each(restrictions, function (k, v) {
        if (k === "round")
        {
            $.each(v, function (k, v) {
                if (k === "value")
                {
                    rounds = v
                }
                else if (k === "operator")
                {
                    filter = v
                }
            })
        }
    })
    if (filter === "Equals")
    {
        return round === rounds
    }
    else if (filter === "Greater than")
    {
        return round > rounds
    }
    else if (filter === "Less than")
    {
        return round < rounds
    }
    return true;
}


function namePredicate(name1, restrictions)
{
    name1 = name1.toLowerCase()
    var name2 = ""
    var filter = ""
    $.each(restrictions, function (k, v) {
        if (k === "name")
        {
            $.each(v, function (k, v) {
                if (k === "value")
                {
                    name2 = v
                }
                else if (k === "operator")
                {
                    filter = v
                }
            })
        }
    })
    if (filter === "Equals")
    {
        return name1 === name2;
    }
    else if (filter === "Contains")
    {
        return name1.includes(name2)
    }
    else if (filter === "None")
    {
        return true;
    }
}

