IMVDb   
============

[![NPM](https://nodei.co/npm/imvdb.png?downloads=true)](https://nodei.co/npm/imvdb/)

**What is this?**  
------------
An NPM package to interact with the IMVDb.com API  
  
**Quick Start**  
  
**Install in your app directory**  

```shell script
npm install imvdb
```
then
```javascript
const IMVDb = require('imvdb')('API_KEY_HERE');
```

You can get your own API Key [from IMVDb.com](https://imvdb.com/developers/apps). You will need an account.  
API calls are limited to 1,000 calls per minute. Keep that in mind.  

## [Search Videos](https://imvdb.com/developers/api/searching)  
Basic search. Returns IMVDb information. Use videoData to get youtube links.  

```javascript
IMVDb.searchVideos('Eye of the tiger').then(function( response){
    console.log( response.results );
}, console.error);
```

## [Search Entities](https://imvdb.com/developers/api/searching)  
An entity is anything with a name in the IMVDb Database (artists, companies, people, etc). You can retreive basic information on an entity as well as information like credits and associated videos.
```javascript
IMVDb.searchEntities('Michel Gondry').then(function( response){
    console.log( response.results );
}, console.error);
```
## [Video Information](https://imvdb.com/developers/api/videos)  
For things like youtube links    
```javascript
imvdb.videoData(199998171889).then(function( response ){
    console.log(`Title: ${response.song_title}`)

    // Filter youtube sources
    let target = response['sources'].filter(function( item ){
        return item.source === 'youtube';
    }).shift(); // Get first youtube link

    console.log(`YouTube: https://www.youtube.com/watch?v=${target['source_data']}`)
})
```

## [Entity Information](https://imvdb.com/developers/api/entities)  
Additional information about an entity.  
```javascript
imvdb.entityData(634).then(function( response ){
    console.log( response )
})
```

