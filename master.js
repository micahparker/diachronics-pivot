function onLoad(doc) {
	var viewer = Pivot.init(doc.getElementById("pivotviewer"));
	var startView = "graph";
	var sortBy = "Primary Purpose of Sacrifice";
	var colorCol = "Primary Purpose of Sacrifice";
	var colors = {
        "Apotropaic": "#264653",
        "Appease wrath": "#2A9D8F",
        "Celebration": "#E9C46A",
        "Covenant": "#B5838D",
        "Fellowship meal": "#F4A261",
        "Gift": "#50514F",
        "Political": "#F25F5C",
        "Purification": "#FFE066",
        "Reparation/Reconciliation": "#247BA0",
        "Worship": "#70C1B3"
    };
	var facetMapping = {
		"Jewish Order Combo": "Jewish Canon Order",
		"Christian Order Combo": "Christian Canon Order",
		"Meal_Involved? (y/n)": "Is a meal involved?",
		"Hebrew_Word": "Hebrew Word",
		"Hebrew_Characters": "Hebrew Characters",
		"English_Gloss": "Definition of Hebrew word",
		"Idolatry (y/n)": "Was idolatry involved?",
		"IF Idolatry; name of god": "Name of idol worshipped",
		"Atonement_Specific (y/n)": "Is atonement specified?",
		"Warfare_Context (y/n)": "Is warfare involved?",
		"Impersonal_Calamity_Averted (y/n)": "Is a disaster averted?",
		"Primary Purpose": "Primary Purpose of Sacrifice",
		"Classic_Documentary_Scource": "Classic Documentary Source",
		"Content": "What's being offered?"
	};
	//set title
	viewer.setTitle("Sacrifice");
	//set facets
	var facets = {
	    "Book": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: false
	    },
	    "Chapter": {
	        type: "Number",
	        isFilterVisible: false,
	        isWordWheelVisible: false,
	        isMetaDataVisible: false
	    },
	    "Verse": {
	        type: "Number",
	        isFilterVisible: false,
	        isWordWheelVisible: false,
	        isMetaDataVisible: false
	    },
	    "Jewish Order": {
	        type: "Number",
	        isFilterVisible: false,
	        isWordWheelVisible: false,
	        isMetaDataVisible: false
	    },
	    "Jewish Order Combo": {
	    	name: "Jewish Canon Order",
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: false,
	        isMetaDataVisible: true
	    },
	    "Christian Order": {
	        type: "Number",
	        isFilterVisible: false,
	        isWordWheelVisible: false,
	        isMetaDataVisible: false
	    },
	    "Christian Order Combo": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Hebrew_Word": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Hebrew_Characters": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "English_Gloss": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Compound_Word": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Offerant": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Meal_Involved? (y/n)": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Idolatry (y/n)": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "IF Idolatry; name of god": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Atonement_Specific (y/n)": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Warfare_Context (y/n)": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Impersonal_Calamity_Averted (y/n)": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Primary Purpose": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Purpose Sub-Type": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Content": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Source_Critical (y/n)": {
	        type: "String",
	        isFilterVisible: false,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    },
	    "Classic_Documentary_Scource": {
	        type: "String",
	        isFilterVisible: true,
	        isWordWheelVisible: true,
	        isMetaDataVisible: true
	    }
	};
	//rename facets
	var _facets = {};
	_.each(facets, function (v,f) {
		var rinsed = f.replace(/_/g," ").match(/[a-zA-Z \?]/g).join("").replace(" yn","?");
		if (facetMapping[f]) {
			_facets[facetMapping[f]] = v;
		}
		else if (rinsed !== f) {
			_facets[rinsed] = v;
			facetMapping[f] = rinsed;
		}
		else {
			_facets[f] = v;
		}
	});
	viewer.setFacets(_facets);
	//set templates
	viewer.setTemplates([
	    {
	        type: "color",
	        width: 80,
	        height: 60,
	        template:
	            '<?\
	                var map = '+JSON.stringify(colors)+';\
	                (map[(facets["'+colorCol+'"] || [0])[0]] || "gray")\
	            ?>'
	    },
	    {
	        type: "html",
	        width: 1000,
	        height: 750,
	        template:
	            '<div style="position:absolute;top:0;bottom:0;left:0;\
	                         right:0;border:10px solid black;font-size:5em">\
	                <div style="position:absolute;width:700px;height:730px;right:0">\
	                    <b><?name?></b>\
	                    <br/>\
	                    <?description?>\
	                </div>\
	            </div>'
	    }
	]);
	//setup initial display
	doc.getElementsByClassName("pivot_" + startView)[0].click();
	doc.getElementsByClassName("pivot_sorttools")[3].value = sortBy;
	viewer[startView + "View"]();
	viewer.sortBy(sortBy);
	//add data
	viewer.addItems(_.map(window.master_data, function (i) {
		_.each(facets, function (ii,f) {
			//fill blanks
			if (!i[f] && !facetMapping[f]) {
				i[f] = (ii.type === "String" ? [""] : [0]);
			}
			else if (!i[f] && facetMapping[f]) {
				i[facetMapping[f]] = (ii.type === "String" ? [""] : [0]);
				delete i[f];
			}
			else if (facetMapping[f]) {
				i[facetMapping[f]] = i[f];
				delete i[f];
			}
			//set value to array
			var ff = (facetMapping[f] || f);
			if (ii.type === "String" && typeof i[ff] === "string" && i[ff].indexOf(",") > -1) {
				i[ff] = _.map(i[ff].split(",").sort(),function(iii){ return iii.trim(); });
			}
			else if (ii.type === "Number" && typeof i[ff] === "string" && i[ff].indexOf('.') > -1) {
				try {
					i[ff] = [parseFloat(i[ff])];
				}
				catch (e) {
					i[ff] = 0.0;
				}
			}
			else if (ii.type === "Number" && typeof i[ff] !== "number") {
				try {
					i[ff] = [parseInt(i[ff])];
				}
				catch (e) {
					i[ff] = 0;
				}
			}
			else {
				i[ff] = [i[ff]];
			}
		});
		//return proper pv format
		return {
	        name: [i.Book+" ", i.Chapter,":",i.Verse].join(""),
	        description: i.Occasion || "",
	        facets: i
	    };
	}));
}