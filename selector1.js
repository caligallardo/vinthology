function clearSelectorOptions(selector){
	selector.innerHTML = "";
}

function setSelectorOptions(selectorObject, optionValues){
	/* 
		selectorObject: an empty select element
		optionValues: a list of optionValues (string), i.e. country names or region names

		Adds optionValue options to selectorObject
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

function generateEntries(results){
	$( "#results").html('');
	if ($("#countrySelector").val() == "All"){
		results = wineries;
	}
	/*
	else if ($("#regionSelector").val() == "All"){
		console.log("here2");
		results = filterByRegion(($(#regionSelector).val()), countryWineries);
	}*/

	console.log("beginning generateEntries. results.length:" + results.length)
	$.each(results, function(index, winery){
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
		var element = document.getElementById("results");
		element.appendChild(entry);
	});
	console.log("entries generated");
	$.getJSON("https://api.myjson.com/bins/18ddbz", function(result){
		wineries = result;
	});
	console.log("winery list size:" + wineries.length);
	return;
}



