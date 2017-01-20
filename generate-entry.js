$.getJSON( "https://api.myjson.com/bins/14z1pf", function(result){
	$.each(result, function(index, winery){
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
		img.src = "images/portfolio-logos/" + winery.logo;

		/* 
		<div class="sitelink">
			<p class="sitelink">Website: </p><a href="" class="winery-website">website url</a>
		</div>
		*/
		var sitelink = document.createElement("div");
		var pSite = document.createElement("p");
		pSite.appendChild(document.createTextNode("Website: "))
		sitelink.appendChild(pSite);
		var a = document.createElement("a");
		a.href = winery.website;
		a.appendChild(document.createTextNode("website"));
		sitelink.appendChild(a);

		logoSpace.appendChild(img);
		logoSpace.appendChild(sitelink);

		// info
		var desSpace = document.createElement("div");
		var h1 = document.createElement("h1");
		var h2 = document.createElement("h2");
		var des = document.createElement("p");
		h1.appendChild(document.createTextNode(winery.name));
		h2.appendChild(document.createTextNode("Region: " + winery.region + "     Country: " + winery.country));
		des.appendChild(document.createTextNode(winery.description));
		desSpace.appendChild(h1);
		desSpace.appendChild(h2);
		desSpace.appendChild(des);
		desSpace.className = "winery-info";

		entry.appendChild(logoSpace);
		entry.appendChild(desSpace);

	})
});
