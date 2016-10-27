/**
 * This simple script uses turf to extract Hennepin County Libraries
 * from a statewide data set and then buffers the points by 2 miles
 *
 * To run simply use $: node index.js
 *
 * @author Andy Walz <andy@cimbura.com>
 */

const fs = require('fs'); // Load node filesystem io https://nodejs.org/api/fs.html
const turf = require('@turf/turf');

// Load GeoJson data: statewide libraries and hennepin county polygon
const points = JSON.parse(fs.readFileSync('./data/mn_libraries.geojson'));
const aoi = JSON.parse(fs.readFileSync('./data/hennepin.geojson'));

// Extract only points within aoi
var results = turf.within(points, aoi);

// Write results to a new geojson file
fs.writeFile('./hennepin_libraries.geojson',JSON.stringify(results));
console.log('saved output to hennepin_libraries.geojson, now opening map...');

// Map the Hennipen Co libaries in geojson.io
mapit(results);

// Buffer the libraries to see how much of county is within 2 miles of a libary
polygons = turf.buffer(results,2,'miles');
mapit(polygons);


function mapit(geojson) {
    // open package allows open a file or url in the user's preferred application
    const open = require('open');

    // pass data to geojson.io via url segment
    var geojsonUrl = 'http://geojson.io/#data=data:application/json,' + encodeURIComponent(JSON.stringify(geojson));

    // open map in default web browser
    open(geojsonUrl);
  }