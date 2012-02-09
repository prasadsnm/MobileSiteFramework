$(function(){
    $.ajax({
        url: "https://api.twitter.com/1/statuses/user_timeline.json?user_id=189311078",
        dataType: 'jsonp',
        success: function(json_results){
            //console.log(json_results);
            // Need to add UL on AJAX call or formatting of userlist is not displayed
            $('#twitList').append('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"></ul>');
            listItems = $('#twitList').find('ul');
            $.each(json_results, function(key) {
                html = '<img src="'+json_results[key].user.profile_image_url+'" class="ui-li-thumb ui-corner-tl/>';
                html += '<div class="x-tweetanchor"></div><div class="tweet-bubble"><div class="tweet-content"><h2 class="ui-li-heading">'+json_results[key].user.name+'</h2><p class="ui-li-desc"><strong>';
                html += json_results[key].text;
                html += '</strong></p>';
                html += '<p class="ui-li-desc">'+json_results[key].created_at+'</p>';

                listItems.append('<li class="ui-li ui-li-static ui-body-c ui-li-has-thumb ui-corner-top">'+html+'</li>');
            });
            // Need to refresh list after AJAX call
            $('#twitList ul').listview();
        }
    });
})