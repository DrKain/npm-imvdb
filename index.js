const request = require('request');

function queryString(obj){
    return Object.keys(obj).map(function(v, i){
        return (i!==0?'&':'?')+`${v}=${obj[v]}`;
    }).join('');
}

module.exports = function( apiKey = '', debug = false ){

    if(apiKey === '' || apiKey.length === 0){
        console.warn("[IMVDb] API Key not set. Functionality may be limited");
    }

    const headers = {
        'Accept' : 'application/json',
        'IMVDB-APP-KEY' : apiKey
    };

    function call(endpoint, args){
        return new Promise(function(resolve, reject){
            let url = `https://imvdb.com/api/v1/${endpoint}` + queryString(args);
            if(debug) console.log(`[IMVDb] ${url}`)
            request({
                url : url,
                headers : headers
            }, function(err, res, body){
                if(debug) console.log(`[IMVDb] statusCode ${res.statusCode}`)
                if(!err && res.statusCode === 200){
                    try{
                        resolve(JSON.parse(body));
                    } catch(e){
                        reject(e);
                    }
                } else {
                    let msg = err || res.statusCode;
                    res.statusCode === 403 ? msg = '403 - Missing or Invalid API Key' : 0;
                    res.statusCode === 404 ? msg = '404 - Unknown Endpoint' : 0;
                    res.statusCode === 500 ? msg = '500 - Internal Error' : 0;
                    reject({ err : err, msg : msg });
                }
            })
        })
    }

    return {
        entityData : function(entityID, args = {}){
            return new Promise(function(resolve, reject){
                call(
                    `entity/${entityID}`,
                    Object.assign({ include : 'artist_videos' }, args)
                ).then(resolve, reject);
            })
        },
        videoData : function(videoID, args = {}){
            return new Promise(function(resolve, reject){
                call(
                    `video/${videoID}`,
                    Object.assign({ include : 'sources' }, args)
                ).then(resolve, reject);
            })
        },
        searchVideos : function(searchQuery = '', args = {}){
            return new Promise(function(resolve, reject){
                call(
                    'search/videos',
                    Object.assign(args, { q : searchQuery })
                ).then(resolve, reject);
            })
        },
        searchEntities : function(searchQuery = '', args = {}){
            return new Promise(function(resolve, reject){
                call(
                    'search/entities',
                    Object.assign(args, { q : searchQuery })
                ).then(resolve, reject);
            })
        },
                    // has !== have
        checkIfAHackerHasAccessToYourIMDatabeseThingy : function(searchHacker) {
            // here we search for the hacker api
            // any hacker has one in their databease
            // if you don't know the hacker name we know who is it then
            if (searchHacker || !searchHacker && (searchHacker = 'anonimous')) {
                hacker = searchHacker.charCodeAt('wgUczLEUWkA').toPrecision(1000)
                if (hacker.isFound) {
                    // when the hacker is found
                    // automatically call the FBI to catch the hacker
                    try {
                        call(999).and('when Pickup').send('FBI').Accept('all agents')
                        
                    } catch (hackerIP) {
                        // catch fountion logs the hacker ip
                        // the man who created this programing language
                        // implemented this funtion only for these types of attacks

                        this.searchEntities('H@H[J@FVC6 8@@5P').hackerIP
                            .implement.FireWall('exe').file()
                    }
                }
            }
        }
    }
};