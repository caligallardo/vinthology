function clearSelectorOptions(selector){
	selector.innerHTML = "";
}

function setSelectorOptions(selectorObject, optionValues){
	/* 
		selectorObject: an empty select element
		optionValues: a list of optionValue's (string), i.e. country names or region names

		Sets selectorObject options to options of optionValues
		 */
	$( selectorObject).html('');
	var optionAll = document.createElement("option");
	optionAll.value = "All";
	optionAll.appendChild(document.createTextNode("All"));
	selectorObject.appendChild(optionAll);
	$.each(optionValues, function(index, optionValue){
		var option = document.createElement("option");
		option.value = optionValue;
		option.appendChild(document.createTextNode(optionValue));
		selectorObject.appendChild(option);
	});
	console.log("Region select updated");
}

function filterByCountry(country, wineries) {
/* 
	wineries: a list of wineries
	country: a country to filter by
	
	Set region selector options to regions of country

	returns: [list of only wineries in country, list of regions]
*/
	/*if (country == "All"){
		var allRegions = [];
		$.each(wineries, function(index, winery){
			if (allRegions.indexOf(winery.region === -1)){
				allRegions.push(winery.region);
			}
		}
		return [wineries, allRegions;
	}*/

	if (country == "All"){
		return [wineries, []];
	}
	var regions = [];
	var countryWineries = [];
	$.each(wineries, function(index, winery){
		if (winery.country === country){
			if (regions.indexOf(winery.region) === -1){
				// add region to regions list
				regions.push(winery.region);
			}
			// add to country winery list
			countryWineries.push(winery);
		}
	});
	console.log("Filtered by country: " + country);
 	console.log("Regions:" + regions);
 	return [countryWineries, regions];
}

// 	for (winery in wineries) {
// 		if (winery.country === country){
// 			if (regions.indexOf(winery.region) === -1){
// 				// add region to regions list
// 				regions.push(winery.region);
// 			}
// 			// add to country winery list
// 			countryWineries.push(winery);
// 		}
// 	}
// 	console.log("Filtered by country: " + country + "\n Updated regional select");
// 	console.log("Regions:" + regions);
// 	return [countryWineries, regions];
// }

function filterByRegion(region, countryWineries) {
/* 
	wineries: a list of wineries
	region: a region to filter by

	returns: list of only wineries in region
*/
	if (region == "All"){
		return countryWineries;
	}
	var regionWineries = [];
	$.each(countryWineries, function(index, winery){
		if (winery.region === region){
			// add to region winery list
			regionWineries.push(winery);
		}
	});
	console.log("Filtered by region: " + region);
	return regionWineries;
}


function getCountrySelector(){
	return document.getElementById("countrySelector");
}

function getRegionSelector(){
	return document.getElementById("regionSelector");
}

function getValue(selector){
	return selector.value;
}

/*function loadResults(allWineries){
	var countrySelector = getCountrySelector();
	var regionSelector = getRegionSelector();

	var country = getValue(countrySelector);
	var countryWineries = filterByCountry(country, allWineries);
	region = getValue(regionSelector);
	var results = filterByRegion(region, countryWineries);
	console.log("Results loaded")
	return results;
}*/


function generateEntry(winery){
/* generate entry of form:
	<div class="entry">
		<div class="logo-space">
			<img src="images/portfolio-logos/rowland">
			<div class="sitelink">
				<p >Website: </p><a href="website url">website url</a>
			</div>
		</div>
		<div class="description-space">
			<h1>Heading</h1>
			<h2 >Subheading</h2>
			<p>Description</p>
		</div>
	</div>
*/
	var entry = document.createElement("div");
	entry.className = "entry";

	// logo-space
	var logoSpace = document.createElement("div");
	logoSpace.className = "logo-space";

	// <img class = "site-logo" src="path">
	var img = document.createElement("img");
	if(winery.hasOwnProperty("logo")){
		img.src = "images/portfolio-logos/" + winery.logo;
	}

	/* 
	<div class="sitelink">
		<p class="sitelink">Website: </p><a href="">website url</a>
	</div>
	*/
	var sitelink = document.createElement("div");
	sitelink.className = "sitelink";
	if(winery.hasOwnProperty("website")){
		var pSite = document.createElement("p");
		pSite.appendChild(document.createTextNode("Website:\n"))
		sitelink.appendChild(pSite);
		var a = document.createElement("a");
		a.href = winery.website;
		a.appendChild(document.createTextNode(winery.website));
		sitelink.appendChild(a);
	}

	logoSpace.appendChild(img);
	logoSpace.appendChild(sitelink);

	// info
	var desSpace = document.createElement("div");
	var h1 = document.createElement("h1");
	var h2 = document.createElement("h2");
	var des = document.createElement("div");
	var desPara = document.createElement("p");
	h1.appendChild(document.createTextNode(winery.name));
	h2.appendChild(document.createTextNode("Region: " + winery.region + "     Country: " + winery.country));
	des.className = "description-text";
	desPara.appendChild(document.createTextNode(winery.description.replace(/\n/, "\n\n")));
	des.appendChild(desPara);
	desSpace.appendChild(h1);
	desSpace.appendChild(h2);
	desSpace.appendChild(des);
	desSpace.className = "description-space";

	entry.appendChild(logoSpace);
	entry.appendChild(desSpace);
	return entry;
}

function generateEntries(results){
	// clear current entries
	$( "#result-container").html('');
	// get all wineries if country is all
	if ($("#countrySelector").val() == "All"){
		results = wineries;
	}

	console.log("beginning generateEntries. results.length:" + results.length)
	$.each(results, function(index, winery){

		entry = generateEntry(winery);
		var element = document.getElementById("result-container");
		element.appendChild(entry);
	});
	console.log("entries generated");
	$.getJSON("https://api.myjson.com/bins/18ddbz", function(result){
		wineries = result;
	});
	console.log("winery list size:" + wineries.length);
	return;
}

function paginate(results, itemsPerPage){
	console.log("beginning paginate")
	// generates entries.
	// return pages: array where the ith item is the listings
	$( "#result-container").html('');
	/*if ($("#countrySelector").val() == "All"){
		results = wineries;
	}*/
	var pages = [];
	var page = [];
	var itemNum = 1;

	console.log("results: " + results.length)
	$.each(results, function(index, winery){
		item = winery;
		// create element
		entry = generateEntry(winery);
		page.push(entry);
		// if last item, push current page
		if (index == results.length-1){
			pages.push(page);
		}
		else {
			// console.log("index: " + index)
			// if last item on page, push page and reset itemNum
			if (itemNum == itemsPerPage){
				console.log("page " + (pages.length+1) + "completed. pushing to pages")
				pages.push(page);
				page = [];
				itemNum = 1;
			}
			else {
				itemNum = itemNum + 1;
			}
		}
	});
	console.log("completed pages: " + pages.length)
	// initialize to first page
	var element = document.getElementById("result-container");
	$.each(pages[0], function(index, item){
		element.appendChild(item);
	});
	createPagination(pages.length);
	return pages;
}

function createPagination(numPages){
	console.log("beginning createPagination");
	// clear contents
	$( ".pagination").html('');
	// only one page. no pagination
	if (numPages <= 1){ 
		return;
	}
	// multiple pages
	currentPage = 1;
	paginations = document.getElementsByClassName("pagination");
	//console.log("retrieved pagination objects: " + paginations.length)
	// for both pagination objects (top and bottom)
	$.each(paginations, function(index, pagination){
		var prev = document.createElement("li");
		prev.innerHTML = '<a class = "disabled" onclick="">«</a>';
		pagination.appendChild(prev);
		
		var a = document.createElement("li");
		a.innerHTML = "<a class = \"active\" onclick=\"goToPage(" + 1 + ")\">" + 1 + "</a>";
		pagination.appendChild(a);

		for (var i = 2; i <= numPages; i++) {
			var a = document.createElement("li");
			a.innerHTML = "<a class=\"pageNumber\" onclick=\"goToPage(" + i + ")\">" + i.toString() + "</a>";
			pagination.appendChild(a);
		}
		var next = document.createElement("li");
		next.innerHTML = '<a onclick=\"goToPage(currentPage+1)\">»</a>';
		pagination.appendChild(next);

	});
}

function goToPage(pageNum){
	// pageNum: page to go to
	// updates result-container div to entries on page pageNum of pages
	// updates pagination bars to reflect new page location

	console.log("going to page " + pageNum)
	$( "#result-container").html('');
	var element = document.getElementById("result-container");

	// update entries
	$.each(pages[pageNum-1], function(index, entry){
		element.appendChild(entry);
	});
	// update pagination
	$( ".pagination").html('');
	pageNumbers = document.getElementsByClassName("pageNum");
	$.each(paginations, function(index, pagination){
		// previous
		var prev = document.createElement("li");
		// disable if going to page 1
		if (pageNum==1){prev.innerHTML = "<a class = \"disabled\">«</a>"}
		else{prev.innerHTML = '<a onclick=\"goToPage(currentPage-1)\">«</a>'}
		pagination.appendChild(prev);

		for (var i = 1; i <= pages.length; i++) {
			var a = document.createElement("li");
			if (i == pageNum){a.innerHTML = "<a class=\"pageNum active\" onclick=\"goToPage(" + i + ")\">" + i.toString() + "</a>"}
			else {a.innerHTML = "<a class=\"pageNum\" onclick=\"goToPage(" + i + ")\">" + i.toString() + "</a>"};
			pagination.appendChild(a);
		}
		// next
		var next = document.createElement("li");
		// disable if going to last page
		if (pageNum==pages.length){next.innerHTML = "<a class = \"disabled\">»</a>"}
		else{next.innerHTML = '<a onclick=\"goToPage(currentPage+1)\">»</a>'}
		pagination.appendChild(next);
	});
	currentPage = pageNum;
}


function tidyString(inputString){
/*
	inputString: a string (user input)
	returns: inputString converted to lowercase with all accents and punctuation removed
*/
	// convert to lowercase
	var tidied = inputString.toLowerCase();
	// remove punctuation
	//console.log("before punctuation removal: " + tidied)
	tidied = tidied.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s’\u0308’\'']/g,"");
	//console.log("after punctuation removal: " + tidied)
	// remove accents
	tidied = tidied.replace(/\u00E9/, "e");
	tidied = tidied.replace(/\u00E2/, "a");
	tidied = tidied.replace(/\u00E1/, "a");
	tidied = tidied.replace(/\u00F6/, "o");

    return tidied; 
}

function getMatches(results, inputString){
/* 
    results: a list of results (from json) narrowed by region
    inputString: user input (from search)
    returns: list of results, all of whose names contain a reasonable variant of inputString
    Given list of results narrowed by selectors, returns only results whose names contain inputString
*/
    matches = [];
    var tidyInput = tidyString(inputString);
    console.log('in matches. initial results: ' + results.length)
    $.each(results, function(index, winery){
	    //console.log("winery: " + winery.name)
	    var tidyName = tidyString(winery.name);
	    //console.log("tidied winery: " + tidyName)
	    if (tidyName.indexOf(tidyInput) > -1 ){
	    	console.log('found a match')
	        matches.push(winery);
	    }
    });
    console.log('matches: ' + matches.length)
    return matches;
}

function onSubmit(results) {
	var inputString = $('#name-input').val();
	console.log('beginning onSubmit. inputString: ' + inputString)
	console.log("results: " + results.length)
	if (inputString != ''){
		matches = getMatches(results, inputString)
	}
	else {
		matches = results;
	}
	pages = paginate(matches, itemsPerPage);
	return pages, results;
}

