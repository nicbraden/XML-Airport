/*
    File:           scripts.js
    Author:         Nicole Braden
    Date:           Feb 7, 2020
    Description:    Project 1
*/

// Referencing the DOM via a global variable
var xmlDoc; 

// This function loads the XML document into the DOM
function loadXMLDoc() {

    // Get an XMLHttpRequest object
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Save the document node
            xmlDoc = this.responseXML;
        }
    };
    xmlhttp.open("GET", "flights.xml", true);
    xmlhttp.send();
}

//grab the elements and attributes and display to the page when arrival button clicked 
function arrivals(xml) {
    //get airport loaction, date and time information
    var airportNode = xmlDoc.documentElement.firstChild.nextSibling;
    var dateNode = getNextSiblingElement(airportNode);
    var timeNode = getNextSiblingElement(dateNode);

      // The simple content of the airport element is the first child node of the airport element
    document.getElementById("airport").innerHTML = airportNode.childNodes[0].nodeValue;
    document.getElementById("datetime").innerHTML = "Last Updated: " + dateNode.childNodes[0].nodeValue
        + ", " + timeNode.childNodes[0].nodeValue;


    var table = "<tr><th>Airlines</th><th>Flight</th><th>Arriving From</th><th>Scheduled Time</th><th>Acutal Time</th><th>Status</th></tr>";

    // Get a NodeList of all arrival elements in the XML document
    var flightNodes = xmlDoc.getElementsByTagName("airline-a");
    var flightNum = xmlDoc.getElementsByTagName("flight")[0];
    var i;
    for (i = 0; i < flightNodes.length; i++) {

        // Get a NamedNodeMap of all the attributes of the current airline element
        var attrs = flightNodes[i].attributes;
        var num = flightNum.childNodes[0];

        // Read the "company" attribute and add another row to the table
        table += "<tr><td>" + attrs.getNamedItem("company").value + "</td><td>";

        // Get a NodeList of the airline's child elements 
        var childNodes = flightNodes[i].childNodes;

        // Search for the "flight number" child element
        var j;
        for (j = 0; j < childNodes.length; j++) {
            if (childNodes[j].nodeName == "flight") {
                table += childNodes[j].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "arriving from" child element
        var k;
        for (k = 0; k < childNodes.length; k++) {
            if (childNodes[k].nodeName == "arriving-from") {
                table += childNodes[k].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "scheduled time" child element
        var l;
        for (l = 0; l < childNodes.length; l++) {
            if (childNodes[l].nodeName == "scheduled-time") {
                table += childNodes[l].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "actual time" child element
        var m;
        for (m = 0; m < childNodes.length; m++) {
            if (childNodes[m].nodeName == "actual-time") {
                table += childNodes[m].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "status" child element
        var n;
        for (n = 0; n < childNodes.length; n++) {
            if (childNodes[n].nodeName == "status") {
                table += childNodes[n].childNodes[0].nodeValue + "</td></tr>";
            }
        }
    }

    // Post table rows
    document.getElementById("flights").innerHTML = table;
}

//get departure informatin
function departures(xml) {
     //get airport location, date and time information
     var airportNode = xmlDoc.documentElement.firstChild.nextSibling;
     var dateNode = getNextSiblingElement(airportNode);
     var timeNode = getNextSiblingElement(dateNode);
 
    // The simple content of the airport element is the first child node of the airport element
    document.getElementById("airport").innerHTML = airportNode.childNodes[0].nodeValue;
    document.getElementById("datetime").innerHTML = "Last Updated: " + dateNode.childNodes[0].nodeValue
         + ", " + timeNode.childNodes[0].nodeValue;


    var table = "<tr><th>Airlines</th><th>Flight</th><th>Arriving From</th><th>Scheduled Time</th><th>Acutal Time</th><th>Status</th></tr>";

    // Get a NodeList of all departure elements in the XML document
    var flightNodes = xmlDoc.getElementsByTagName("departure-airline");
    var flightNum = xmlDoc.getElementsByTagName("departure-flight")[0];
    var i;
    for (i = 0; i < flightNodes.length; i++) {

        // Get a NamedNodeMap of all the attributes of the current airline element
        var attrs = flightNodes[i].attributes;
        var num = flightNum.childNodes[0];

        // Read the "company" attribute and add another row to the table
        table += "<tr><td>" + attrs.getNamedItem("name").value + "</td><td>";

        // Get a NodeList of the airline's child elements 
        var childNodes = flightNodes[i].childNodes;

        // Search for the "flight number" child element
        var j;
        for (j = 0; j < childNodes.length; j++) {
            if (childNodes[j].nodeName == "departure-flight") {
                table += childNodes[j].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "arriving from" child element
        var k;
        for (k = 0; k < childNodes.length; k++) {
            if (childNodes[k].nodeName == "leaving-from") {
                table += childNodes[k].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "scheduled time" child element
        var l;
        for (l = 0; l < childNodes.length; l++) {
            if (childNodes[l].nodeName == "scheduled-departure-time") {
                table += childNodes[l].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "actual time" child element
        var m;
        for (m = 0; m < childNodes.length; m++) {
            if (childNodes[m].nodeName == "actual-depature-time") {
                table += childNodes[m].childNodes[0].nodeValue + "</td><td>";
            }
        }
        // Search for the "status" child element
        var n;
        for (n = 0; n < childNodes.length; n++) {
            if (childNodes[n].nodeName == "departure-status") {
                table += childNodes[n].childNodes[0].nodeValue + "</td></tr>";
            }
        }
    }

    // Post table rows
    document.getElementById("flights").innerHTML = table;
}

function getNextSiblingElement(n) {
    var x = n.nextSibling;
    while (x !== null && x.nodeType !== Node.ELEMENT_NODE) {
        x = x.nextSibling;
        return x;
    }
}