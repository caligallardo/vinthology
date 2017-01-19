var para = document.createElement("p");
var node = document.createTextNode("This is new.");
para.appendChild(node);
var element = document.getElementById("div1");
element.appendChild(para);

document.write("<div class='entry-content'>");
$.getJSON( "portfolio-data.json", function(result){
	$.each(result, function(index, wine){
		document.write("<div class='entry'>");
		$.each(wine, function(key, value){
			document.write("<div class='" + key + "'>" + value + "</div>");
		})
		document.write("</div>");
	})
});
document.write("</div>");


			$.getJSON( "portfolio-data.json", function(result){
				$.each(result, function(index, wine){
					var entry = document.createElement("div");
					entry.className = "entry" + index.toString();
					$.each(wine, function(key, value){
						var property = document.createElement("div");
						property.className(key);
						var text = document.createTextNode(value)
						entry.append()
						document.write("<div class='" + key + "'>" + value + "</div>");
					})
					document.write("</div>");
				})
			});

/*




	<div class="three-fourths first">


<div class="entry-content" itemprop="text"><div class="three-fourths first">
<h2>Árido</h2>
</div>
<div class="one-half first">
<p>The winery is located in Barrancas (Maipú district), 30 km from Mendoza and near the Mendoza River gullies. With sandy soils and a wide temperature range, this region offers ideal agro-climatic conditions for the production of expressive wines with good acidity, color, and ripe, elegant tannins.</p>
<p>Árido wines are unoaked, fermented 100% in stainless steel tanks. This allows the bright fruit and true varietal character to shine through unmasked. Bottled under screwcap to preserve their freshness and easy to open for waitstaff and consumers.</p>
</div>
<div class="one-fourth">
<p><strong>Website:</strong> <a href="http://www.blendsinc.com/">www.blendsinc.com</a></p>
<p><strong>Region:</strong> Mendoza</p>
<p><strong>Country:</strong> Argentina</p>
</div>
<div class="one-fourth"><img width="110" height="124" src="http://phenixwinedistributors.com/wp-content/uploads/2016/06/Arido_Logo.jpg" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""></div></div
*/