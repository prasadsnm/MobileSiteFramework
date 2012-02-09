$.ajaxSetup({
	error:function(x,e,errorThrown) {
		console.log(x.getStatusCode());
		$("#status").prepend("Error!");		
	}
});


//EDIT THESE LINES
//Title of the blog
var TITLE = "Library News";
//RSS url
var RSS = "http://gprclibrarynews.wordpress.com/feed/";
//Stores entries
var entries = [];
var selectedEntry = "";

//listen for detail links
$(".contentLink").live("click", function() {
	selectedEntry = $(this).data("entryid");
});

function renderEntries(entries) {
    var s = '';
    $.each(entries, function(i, v) {
        s += '<li><a href="#contentPage"  data-transition="fade" class="contentLink" data-entryid="'+i+'">' + v.title + '</a></li>';
    });
    $("#newsList").html(s);
    $("#newsList").listview("refresh");		
}

//Listen for main page
$("#news").live("pageinit", function() {
	//Set the title
	$("h1", this).text(TITLE);
	
	$.ajax({
		url:RSS,
		success:function(res,code) {
			entries = [];
			var xml = $(res);
			var items = xml.find("item");
			$.each(items, function(i, v) {
				entry = { 
					title:$(v).find("title:first").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("encoded").text())
				};
				entries.push(entry);
			});
			//store entries
			localStorage["entries"] = JSON.stringify(entries);
			renderEntries(entries);
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(localStorage["entries"]) {
				$("#status").html("Using cached version...");
				entries = JSON.parse(localStorage["entries"])
				renderEntries(entries);				
			} else {
				$("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			}
		}
	});
	
});

$("#news").live("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
	//	$("h1", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
});

//Listen for the content page to load
$("#contentPage").live("pageshow", function(prepage) {
	//Set the title
	$("h1", this).text('Library News');
	var contentHTML = "";
	contentHTML += '<h2 style="text-align:center;">' + entries[selectedEntry].title + '</h2>';
	contentHTML += entries[selectedEntry].description;
	contentHTML += '<p/><a href="'+entries[selectedEntry].link + '">Read Entry on Site</a>';
	$("#entryText",this).html(contentHTML);
});
	
