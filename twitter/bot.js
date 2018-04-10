// console.log('bot is starting');

var twit = require('twit');
var config = require('./config');
var T = new twit (config);
//var params = {q: 'banana', count: 1};
//var tweet = {status: 'this is #codingrainbow'};
var exec = require('child_process').exec;
var cmd = 'processing-java --sketch=%cd%/ortwy --run';
//exec(cmd, processing);
//file
var fs = require('fs');


var stream = T.stream('user');
stream.on('follow', followed);

function followed(eventMsg){
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
//  console.log('name ', screenName);
  tweetIt(screenName);
}

function processing() {
  console.log('finished');

  var filename = 'ortwy/output.png';
  var params = {
    encoding:'base64'
  };
  var content = fs.readFileSync(filename, params);

  T.post('media/upload', { media_data: content }, uploaded);
}

function uploaded(err, data, response){
  //this is where I will tweet
  var id = data.media_id_string;
  var tweet = {
    status: 'Abstract #art ',
    media_ids: id
  };
  T.post('statuses/update', tweet, tweeted);
}

//setInterval(tweetIt, 1000*20);

setInterval(retweet, 1000*30);

function tweeted (err, data, response){
  if (err)
  console.log("something went wrong, ", err);
//  else
//  console.log(data);
} ;

function tweetIt(msg) {
  var cmd = 'processing-java --sketch=%cd%/ortwy --run';
  exec(cmd, processing);

  var r = Math.floor(Math.random()*100);
  var text;
  if (msg) {
    text = '@' + msg + ', welcome to New York. Your number is ' + r;
    var tweet = {
      status: text
    };
    T.post('statuses/update', tweet, tweeted);
  }
  //   text = '@' + msg + ', welcome to New York. Your number is ' + r;
  // else text = 'Number: ' + r;
  //
  // var tweet = {
  //   status: text
  // };
  // T.post('statuses/update', tweet, tweeted);
}


function retweet () {
  var now = new Date();
  console.log(now);
  var dd = '01'//now.getDate();
  var mm = now.getMonth(); //January is 0!
  var yyyy = now.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }

  var q = '#newyork since:' + yyyy + '-' + mm + '-' + dd;
  console.log(q);
  //banana since:2011-07-11
  var resp
    T.get('search/tweets', { q: q, count: 10 }, function(err, data, response) {
      if (err)
      console.log("something went wrong, ", err);
      else{
      //  console.log(data);
          var tweets = data.statuses;
          for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].id);
          }
          var idi = tweets[4].id;
          T.post('statuses/retweet/:idi', { id: idi },
                     function (err, data, response) {
                              console.log(data);
                          });
      //  var id_ = data.statuses;
      //  console.log("DATA STATUSES", id_);
// if (data.statuses){
//         if (data.statuses.id){
//           id_ = data.statuses.id;
//           console.log("ID NORMALNYI BLYA ", id_)
//           console.log(id_.is)
//           T.post('statuses/retweet/:id', { id: id_.id },
//           function (err, data, response) {
//                    console.log(data);
//                  });
//         }
//       }

        // T.post('statuses/retweet/:id', { id: id_ },
        // function (err, data, response) {
        //          console.log(data);
        //        });
      // console.log('Retweet?')
      // var r = Math.floor(Math.random()*100);
      //   resp = data[r].status;
      //   console.log(resp);
      //       if (!resp.retweeted){ // && resp.favorite_count > 3){
      //           T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
      //         //  console.log(data);
      //         console.log('YES');
      //       });
      //     } else {console.log('NO');}
      }

    });
  //   if (resp) {
  //     var id = resp.id;
  //     if (!resp.retweeted){ // && resp.favorite_count > 3){
  //         T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
  //       //  console.log(data);
  //       console.log('YES');
  //       })
  //     }
  //   resp.faworite_count = 0;
  // } else
  // console.log('NO');

}




// T.get('followings/ids', { screen_name: 'contemporaryHow' },  function (err, data, response) {
//   console.log(data)
// })

// T.get('search/tweets', params, gotData);
//
// function gotData(err, data, response){
//
//   var tweets = data.statuses;
//   for(var i = 0; i < tweets.length; i++){
//     console.log(tweets[i].text);
//   }
//
// }
