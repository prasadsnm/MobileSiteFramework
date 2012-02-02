$(function(){
    $.ajax({
        url: "https://api.twitter.com/1/statuses/user_timeline.json?user_id=189311078",
        dataType: 'jsonp',
        success: function(json_results){
            console.log(json_results);
            // Need to add UL on AJAX call or formatting of userlist is not displayed
            $('#twitList').append('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b"></ul>');
            listItems = $('#twitList').find('ul');
            $.each(json_results, function(key) {
                html = '<img src="'+json_results[key].user.profile_image_url+'"/>';
                html += '<div class="x-tweetanchor"></div><div class="tweet-bubble"><div class="tweet-content"><h2>'+json_results[key].user.name+'</h2><p><strong>';
                html += json_results[key].text;
                html += '</strong></p>';
                html += '<p>'+json_results[key].created_at+'</p>';

                listItems.append('<li>'+html+'</li>');
            });
            // Need to refresh list after AJAX call
            $('#twitList ul').listview();
        }
    });
})