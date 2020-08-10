'use strict';

$(function() {

  // get the current tab
  chrome.tabs.query({
      active: true,
      currentWindow: true
    //TAKES THE CURRENT TAB AND WE DEFINE A FUNCTION OF THE TAB
    }, function(tabs) {
      // send a message to the content script
      var sendMessage = function(type, data, callback) {

        chrome.tabs.executeScript( tabs[0].id, {
        //code: 'document.body.style.backgroundColor="orange"'
         file: 'content_script.js'
        }, function() {
      //  chrome.extension.getBackgroundPage().console.log("fleefooflee");
            chrome.tabs.sendMessage(tabs[0].id, {
                type: type,
                data: data
            }, function(response) {

                if (callback) {
                       callback(response);
                        }
            })
        });
      };
      // get the session if there is one
      var showConnected = function(sessionId) {
              var urlWithSessionId = sessionId;
              $('.disconnected').addClass('hidden');
              $('.connected').removeClass('hidden');
              $('#show-chat').prop('checked', true);
              $('#share-url').val(urlWithSessionId).focus().select();
            };

      $('#create-session').click(function() {

                sendMessage('createSession', {
                  controlLock: false,
                  videoId: 1
                }, function(response) {
                showConnected(response.sessionId);
                });


              });

       $('#js').submit(function(e){
                e.preventDefault();

                 sendMessage('joinSession', {
                           sessionId: $('#j').val(),
                           videoId: 1
                        }, function(response){});
         });



      });
    }
  );
