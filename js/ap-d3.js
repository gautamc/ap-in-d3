DemographicsListingView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
	var variables = {
	    demographics_data: this.options.demographics_data.sort(function(a,b){
		return parseInt(a.gender_ratio_number_of_females_per_1000_males_2011) >= parseInt(b.gender_ratio_number_of_females_per_1000_males_2011);
	    })
	};
	var template = _.template( $("#demographics_listing_template").html(), variables );
	this.$el.html( template );
    },
});

function change(val1, val2) {
    var change = parseInt(val1) - parseInt(val2);
    if( change == 0 ) {
	return "No Change";
    } else if( change > 0) {
	return "Positive " + change;
    } else {
	return "Negative " + change;
    }
}

$(document).ready(function(){

    var width = 560, height = 550, demographics_data;
    var lt_1k_brightness_scale, gt_1k_brightness_scale;

    var svg1, regions1, projection1, path1, centered;
    var svg2, regions2, projection2, path2, centered_2;

    svg1 = d3.select("#map1").append("svg")
	.attr("width", width)
	.attr("height", height);

    regions1 = svg1.append("g")
	.attr("id", "regions");
    regions1.append("rect")
	.attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.on("click", click1);

    projection1 = d3.geo.mercator()
	.center([50.0, 1])
	.scale(6.5*width)
	.translate([-1*((6*width)/2), height*2.27]);
    path1 = d3.geo.path()
	.projection(projection1);

    svg2 = d3.select("#map2").append("svg")
	.attr("width", width)
	.attr("height", height);

    regions2 = svg2.append("g")
	.attr("id", "regions");
    regions2.append("rect")
	.attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.on("click", click2);

    projection2 = d3.geo.mercator()
	.center([50.0, 1])
	.scale(6.5*width)
	.translate([-1*((6*width)/2), height*2.27]);
    path2 = d3.geo.path()
	.projection(projection2);

    d3.json("./json/andhra_pradesh_demographics.json", function(error, data){

	demographics_data = data;
	var districts = _.reject(
	    demographics_data,
	    function(e){
		return e.district_code == "28";
	    }
	);
	var districts_lt_1k_2011 = _.filter(
	    districts,
	    function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 ) < 1000;
	    }
	);
	var districts_gt_1k_2011 = _.filter(
	    districts,
	    function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 ) >= 1000;
	    }
	);
	var districts_lt_1k_2001 = _.filter(
	    districts,
	    function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 ) < 1000;
	    }
	);
	var districts_gt_1k_2001 = _.filter(
	    districts,
	    function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 ) >= 1000;
	    }
	);
	var min_sub_k_ratio_2011, max_sub_k_ratio_2011;
	var min_sub_k_ratio_2001, max_sub_k_ratio_2001;
	var min_above_k_ratio_2011, max_above_k_ratio_2011;
	var min_above_k_ratio_2001, max_above_k_ratio_2001;
	var min_sub_k_ratio, max_sub_k_ratio, min_above_k_ratio, max_above_k_ratio;
	
	min_sub_k_ratio_2011 = _.min(
	    districts_lt_1k_2011, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 );
	    }
	);
	max_sub_k_ratio_2011 = _.max(
	    districts_lt_1k_2011, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 );
	    }
	);
	min_sub_k_ratio_2001 = _.min(
	    districts_lt_1k_2001, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 );
	    }
	);
	max_sub_k_ratio_2001 = _.max(
	    districts_lt_1k_2001, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 );
	    }
	);
	min_sub_k_ratio = parseInt(min_sub_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) <= parseInt(min_sub_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001) ?
	    parseInt(min_sub_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) : parseInt(min_sub_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001);
	max_sub_k_ratio = parseInt(max_sub_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) >= parseInt(max_sub_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001) ?
	    parseInt(max_sub_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) : parseInt(max_sub_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001);
	
	min_above_k_ratio_2011 = _.min(
	    districts_gt_1k_2011, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 );
	    }
	);
	max_above_k_ratio_2011 = _.max(
	    districts_gt_1k_2011, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2011 );
	    }
	);
	min_above_k_ratio_2001 = _.min(
	    districts_gt_1k_2001, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 );
	    }
	);
	max_above_k_ratio_2001 = _.max(
	    districts_gt_1k_2001, function(e){
		return parseInt( e.gender_ratio_number_of_females_per_1000_males_2001 );
	    }
	);
	min_above_k_ratio = parseInt(min_above_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) <= parseInt(min_above_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001) ?
	    parseInt(min_above_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) : parseInt(min_above_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001);
	max_above_k_ratio = parseInt(max_above_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) >= parseInt(max_above_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001) ?
	    parseInt(max_above_k_ratio_2011.gender_ratio_number_of_females_per_1000_males_2011) : parseInt(max_above_k_ratio_2001.gender_ratio_number_of_females_per_1000_males_2001);

	lt_1k_brightness_scale = d3.scale.linear()
	    .domain([min_sub_k_ratio, max_sub_k_ratio]).range([0.0, 2.0]);
	gt_1k_brightness_scale = d3.scale.linear()
	    .domain([min_above_k_ratio, max_above_k_ratio]).range([0.0, 2.0]);
	
	d3.json("./json/ap-dist_topo.json", function(error, ap_topo_json) {

	    //var subunits = topojson.feature(ap_topo_json, ap_topo_json.objects.andhra_pradesh);
	    var subunits = topojson.feature(ap_topo_json, ap_topo_json.objects["ap-dist"]);

	    // First Map

	    regions1.selectAll("path")
		.data(subunits.features)
		.enter().append("path")
		.attr("class", "region")
		.style("fill", function(d,i){
		    
		    var region_id = d.id;
		    var region_name = _.map(
			d.properties.name.split(/\s+/),
			function(e){ return _.str.capitalize(e.toLowerCase()); }
		    ).join(" ");

		    if ( demographics_data[region_name] ) {
			male_count = demographics_data[region_name]["male_population_2011"];
			female_count = demographics_data[region_name]["females_population_2011"];
			gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2011"];
			var gender_ratio_as_int = parseInt(gender_ratio);
			if( gender_ratio_as_int < 1000 ){
			    return d3.rgb(46,15,33).brighter(
				lt_1k_brightness_scale(gender_ratio_as_int)
			    ).toString();
			} else {
			    return d3.rgb(220,220,0).brighter(
				gt_1k_brightness_scale(gender_ratio_as_int)
			    ).toString();
			}
		    } else {
			return "#fff";
		    }
		})
		.attr("id", function(d){ return d.id; } )
		.attr("d", path1)
		.on("click", click1);

	    if( false ) {
		regions1.selectAll(".region-label")
		    .data(topojson.feature(ap_topo_json, ap_topo_json.objects["ap-dist"]).features)
		    .enter().append("text")
		    .attr("class", function(d) { return "region-label " + d.id; })
		    .attr("transform", function(d) { return "translate(" + path1.centroid(d) + ")"; })
		    .attr("dy", ".35em")
		    .text(function(d) {
			if( d.properties.name == "Rangareddy" ) {
			    return "RR";
			} else {
			    return d.properties.name;
			}
		    })
		    .style("fill", function(d,i){
			var region_id = d.id;
			var region_name = _.map(
			    d.properties.name.split(/\s+/),
			    function(e){ return _.str.capitalize(e.toLowerCase()); }
			).join(" ");
			
			if ( demographics_data[region_name] ) {
			    male_count = demographics_data[region_name]["male_population_2011"];
			    female_count = demographics_data[region_name]["females_population_2011"];
			    gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2011"];
			    var gender_ratio_as_int = parseInt(gender_ratio);
			    if( gender_ratio_as_int < 1000 ){
				return d3.rgb(46,15,33).brighter(
				    lt_1k_brightness_scale(gender_ratio_as_int)
				).toString();
			    } else {
				return "#000";
			    }
			} else {
			    return "#000";
			}
		    });
	    }

	    // Second Map

	    regions2.selectAll("path")
		.data(subunits.features)
		.enter().append("path")
		.attr("class", "region")
		.style("fill", function(d,i){
		    
		    var region_id = d.id;
		    var region_name = _.map(
			d.properties.name.split(/\s+/),
			function(e){ return _.str.capitalize(e.toLowerCase()); }
		    ).join(" ");

		    if ( demographics_data[region_name] ) {
			gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2001"];
			var gender_ratio_as_int = parseInt(gender_ratio);
			if( gender_ratio_as_int < 1000 ){
			    return d3.rgb(46,15,33).brighter(
				lt_1k_brightness_scale(gender_ratio_as_int)
			    ).toString();
			} else {
			    return d3.rgb(220,220,0).brighter(
				gt_1k_brightness_scale(gender_ratio_as_int)
			    ).toString();
			}
		    } else {
			return "#fff";
		    }
		})
		.attr("id", function(d){ return d.id; } )
		.attr("d", path2)
		.on("click", click2);

	    if( false ) {
		regions2.selectAll(".region-label")
		    .data(topojson.feature(ap_topo_json, ap_topo_json.objects["ap-dist"]).features)
		    .enter().append("text")
		    .attr("class", function(d) { return "region-label " + d.id; })
		    .attr("transform", function(d) { return "translate(" + path2.centroid(d) + ")"; })
		    .attr("dy", ".35em")
		    .text(function(d) {
			if( d.properties.name == "Rangareddy" ) {
			    return "RR";
			} else {
			    return d.properties.name;
			}
		    })
		    .style("fill", function(d,i){
			var region_id = d.id;
			var region_name = _.map(
			    d.properties.name.split(/\s+/),
			    function(e){ return _.str.capitalize(e.toLowerCase()); }
			).join(" ");
			
			if ( demographics_data[region_name] ) {
			    gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2001"];
			    var gender_ratio_as_int = parseInt(gender_ratio);
			    if( gender_ratio_as_int < 1000 ){
				return d3.rgb(46,15,33).brighter(
				    lt_1k_brightness_scale(gender_ratio_as_int)
				).toString();
			    } else {
				return "#000";
			    }
			} else {
			    return "#000";
			}
		    });
	    }
	});
	
	var demographics_listing_view = new DemographicsListingView({
	    el: $("#demographics_listing"),
	    demographics_data: districts
	});
    });

    function click1(d,i) {
	var x, y, k;

	if (d && centered !== d) {
	    var centroid = path1.centroid(d);
	    x = centroid[0];
	    y = centroid[1];
	    k = 2;
	    centered = d;
	} else {
	    x = width / 2;
	    y = height / 2;
	    k = 1;
	    centered = null;
	}

	if( $("div.html-overlay").length > 0 ) {
	    d3.select("div.html-overlay").remove();
	} else {
	    svg1.selectAll("#overlay").remove();
	}

	regions1.selectAll("path.active").style("fill", function(d,i){
	    var region_id = d.id;
	    var region_name = _.map(
		d.properties.name.split(/\s+/),
		function(e){ return _.str.capitalize(e.toLowerCase()); }
	    ).join(" ");
	    if ( demographics_data[region_name] ) {
		male_count = demographics_data[region_name]["male_population_2011"];
		female_count = demographics_data[region_name]["females_population_2011"];
		gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2011"];
		var gender_ratio_as_int = parseInt(gender_ratio);
		if( gender_ratio_as_int < 1000 ){
		    return d3.rgb(46,15,33).brighter(
			lt_1k_brightness_scale(gender_ratio_as_int)
		    ).toString();
		} else {
		    return d3.rgb(220,220,0).brighter(
			gt_1k_brightness_scale(gender_ratio_as_int)
		    ).toString();
		}
	    } else {
		return "#fff";
	    }
	});

	regions1.selectAll("path")
	    .classed("active", centered && function(d,i) {
		if ( d === centered ) {
		    this.style.fill = "#0033CC";
		}
		return d === centered;
	    });

	regions1.transition()
	    .duration(1000)
	    .attr(
		"transform",
		"translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")"
	    )
	    .style("stroke-width", 1.0 / k + "px")
	    .each("end", function(){
		
		if(centered != null) {

		    var region_id = d.id;
		    var region_name = _.map(
			d.properties.name.split(/\s+/),
			function(e){ return _.str.capitalize(e.toLowerCase()); }
		    ).join(" ");
		    var overlay_html = "<strong>" + region_name + "</strong>";
		    var overlay_text = region_name;
		    if ( demographics_data[region_name] ) {
			male_count = demographics_data[region_name]["male_population_2011"];
			female_count = demographics_data[region_name]["females_population_2011"];
			gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2011"];
			overlay_html += "<p>Male Population: " + male_count +
                            "<br />Female Population:" +  female_count +
                            "<br />Gender Ratio - per 1000: " + gender_ratio + "</p>";
			overlay_text += "\nGender Ratio: " + gender_ratio + "\n";
		    } else {
			overlay_html += "<p>No Data found!</p>";
			overlay_text += "No Data found!";
		    }

		    if ( ! quineloop_utils.browser_isie_p() ) {
			svg1.append("foreignObject")
			    .attr("id", "overlay")
			    .attr("width", 200)
			    .attr("height", 150)
			    .attr("x", width/2)
			    .attr("y", height/2)
			    .append("xhtml:body")
			    .attr("id", "no-op")
			    .append("div")
			    .attr("class", "overlay")
			    .html(overlay_html);
		    } else {
			svg1.append("text")
			    .attr("id", "overlay")
			    .attr("width", 200)
			    .attr("height", 150)
			    .attr("x", width/2)
			    .attr("y", height/2)
			    .attr("font-weight", "bold")
			    .attr("class", "overlay")
			    .text(overlay_text);
		    }
		}
	    });
    }

    function click2(d,i) {
	var x, y, k;

	if (d && centered_2 !== d) {
	    var centroid = path2.centroid(d);
	    x = centroid[0];
	    y = centroid[1];
	    k = 2;
	    centered_2 = d;
	} else {
	    x = width / 2;
	    y = height / 2;
	    k = 1;
	    centered_2 = null;
	}

	if( $("div.html-overlay").length > 0 ) {
	    d3.select("div.html-overlay").remove();
	} else {
	    svg2.selectAll("#overlay").remove();
	}

	regions2.selectAll("path.active").style("fill", function(d,i){
	    var region_id = d.id;
	    var region_name = _.map(
		d.properties.name.split(/\s+/),
		function(e){ return _.str.capitalize(e.toLowerCase()); }
	    ).join(" ");
	    if ( demographics_data[region_name] ) {
		gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2001"];
		var gender_ratio_as_int = parseInt(gender_ratio);
		if( gender_ratio_as_int < 1000 ){
		    return d3.rgb(46,15,33).brighter(
			lt_1k_brightness_scale(gender_ratio_as_int)
		    ).toString();
		} else {
		    return d3.rgb(220,220,0).brighter(
			gt_1k_brightness_scale(gender_ratio_as_int)
		    ).toString();
		}
	    } else {
		return "#fff";
	    }
	});

	regions2.selectAll("path")
	    .classed("active", centered_2 && function(d,i) {
		if ( d === centered_2 ) {
		    this.style.fill = "#0033CC";
		}
		return d === centered_2;
	    });

	regions2.transition()
	    .duration(1000)
	    .attr(
		"transform",
		"translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")"
	    )
	    .style("stroke-width", 1.0 / k + "px")
	    .each("end", function(){
		
		if(centered_2 != null) {

		    var region_id = d.id;
		    var region_name = _.map(
			d.properties.name.split(/\s+/),
			function(e){ return _.str.capitalize(e.toLowerCase()); }
		    ).join(" ");
		    var overlay_html = "<strong>" + region_name + "</strong>";
		    var overlay_text = region_name;
		    if ( demographics_data[region_name] ) {
			gender_ratio = demographics_data[region_name]["gender_ratio_number_of_females_per_1000_males_2001"];
			overlay_html += "<p>Gender Ratio - per 1000: " + gender_ratio + "</p>";
			overlay_text += "\nGender Ratio: " + gender_ratio + "\n";
		    } else {
			overlay_html += "<p>No Data found!</p>";
			overlay_text += "No Data found!";
		    }

		    if ( ! quineloop_utils.browser_isie_p() ) {
			svg2.append("foreignObject")
			    .attr("id", "overlay")
			    .attr("width", 200)
			    .attr("height", 150)
			    .attr("x", width/2)
			    .attr("y", height/2)
			    .append("xhtml:body")
			    .attr("id", "no-op")
			    .append("div")
			    .attr("class", "overlay")
			    .html(overlay_html);
		    } else {
			svg2.append("text")
			    .attr("id", "overlay")
			    .attr("width", 200)
			    .attr("height", 150)
			    .attr("x", width/2)
			    .attr("y", height/2)
			    .attr("font-weight", "bold")
			    .attr("class", "overlay")
			    .text(overlay_text);
		    }
		}
	    });
    }
});