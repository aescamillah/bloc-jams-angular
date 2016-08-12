 (function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
          /**
          * @desc Album currentl selected
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
         
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
             if (currentBuzzObject) {
                 stopSong(SongPlayer.currentSong);
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
          };
         
          /**
          * @function playSong
          * @desc Plays the file loaded as currentBuzzObject and sets song.playing as true
          * @param {Object} song
          */
          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;
          };
         
          /**
          * @function stopSong
          * @desc Stops the file loaded as currentBuzzObject and sets song.playing as null
          * @param {Object} song
          */
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          };
         
          /**
          * @function getSongIndex
          * @desc Returns the index of the song passed as argument from the current album
          * @param {Object} song
          * returns integer
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

         
         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
          SongPlayer.currentSong = null;

          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);
                    }
              }
          };
         
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };
         
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
              
              if (currentSongIndex < 0) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
         
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
              
              if (currentSongIndex == currentAlbum.songs.length ) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();