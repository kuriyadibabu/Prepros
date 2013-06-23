/**
 * Prepros
 * (c) Subash Pathak
 * sbshpthk@gmail.com
 * License: MIT
 */

/*jshint browser: true, node: true, unused: false*/
/*global prepros,  _, $*/

//Title Bar controls
prepros.controller('TitlebarCtrl', function ($scope, config, utils) {

    'use strict';

    var path = require('path');

    //Support Author Link
    $scope.supportAuthor = function () {

        utils.openBrowser(config.online.loveUrl);

    };

    //Minimize app to tray by hiding the window
    $scope.toTray = function(){
        require('nw.gui').Window.get().hide();
    };

    //Minimize app
    $scope.minimize = function(){
        require('nw.gui').Window.get().minimize();
    };

    //Close App
    $scope.close = function(){
        require('nw.gui').Window.get().close();
    };

    //Update Checker
    $scope.goWebsite = function(){

        utils.openBrowser(config.online.url);

    };

    config.checkUpdate(function(data){

        if(data.available){
            $scope.appUpdate = true;
        }

    });

    //Open Options Window
    var optionsWindow;
    $scope.openOptionsWindow = function () {

        //Inject config object to global so options window can read it
        global.userConfig = config.getUserOptions();

        if (optionsWindow) {

            optionsWindow.show();
            optionsWindow.focus();

        } else {

            var optionsPath = 'file:///' + path.normalize(config.basePath + '/html/options.html');

            optionsWindow = require('nw.gui').Window.open(optionsPath, {
                position: 'center',
                width: 600,
                height: 580,
                frame: true,
                toolbar: false,
                icon: 'app/assets/img/icons/128.png',
                resizable: false
            });

            optionsWindow.on('close', function () {
                config.saveUserOptions(global.userConfig);
                optionsWindow.close(true);
                optionsWindow = null;
            });
        }

        //Close options window when main window is closed
        require('nw.gui').Window.get().on('close', function () {

            if (optionsWindow) {
                optionsWindow.close();
            }
        });

    };
});