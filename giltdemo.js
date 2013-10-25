$(document).ready(function(){
	// handlebars helper script for capturing the correct img url from the nested elements
	Handlebars.registerHelper('link', function() {
	  return imgUrl;
	});
	// imgUrl def
	var imgUrl = "";
	// template for sales divs
	var source =  '<div class="pure-u-1-4">' +
				'<div class="l-box">' +
				'<div class="sales_entry">' + 
	            '<a href="{{sale_url}}" title="{{name}}" target="_blank">' +
	            '<img src="{{link}}" alt="{{name}}"/>' +
	            '<h3>{{name}}</h3>' +
	            '</a>' +
	            '<p class="desc">' +
	            '{{description}}' +
	            '</p>' +
	            '</div>' +
	            '</div>' +
	            '</div>';
	// create a var that gets turned into a handlebars function to parse the returned JSON into the correct expressions in the predefined source template
	var template = Handlebars.compile(source, imgUrl);
	// def var for final div to be injected into the page
	var result = "";
	// REST API call for active men's sales items on Gilt.com
	function getSales() {
	    // Get a list of active sales using API
	    $.getJSON("https://api.gilt.com/v1/sales/men/active.json", {
	        apikey: "b440efbd67d68ed7a11435b1fe2c06f9"
	    }, function(data) {
	        // Call handlebars.js function for processing data
	      for(i=0;i<=3;i++) {
	      	// set img url for current sales item
	      	imgUrl = data.sales[i].image_urls["253x260"][0].url;
	        // process the key:value pairs for the current item through the source template
	        result = template(data.sales[i], imgUrl);
	        // append the completed div in the appropriate section of the page
	        $('#sales_items').append(result);
	      }
	    });
	}
	getSales();
});