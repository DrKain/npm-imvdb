const imvdb = require('../index')('API_KEY_HERE');

// Basic video search
imvdb.searchVideos('Survivor - Eye of the Tiger').then(function( response ){
    console.log(`Found ${response.results.length} videos`)
    console.log( response.results[0] );
});

// Video Information
imvdb.videoData(199998171889).then(function( response ){
    console.log(`Title: ${response.song_title}`)

    // Filter youtube sources
    let target = response['sources'].filter(function( item ){
        return item.source === 'youtube';
    }).shift(); // Get first youtube link

    console.log(`YouTube: https://www.youtube.com/watch?v=${target['source_data']}`)
})
