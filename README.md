####a window manager for web browsers

    ,--.   ,--.,--.   ,--.      ,--.        
    |  |   |  ||   `.'   |      `--' ,---.  
    |  |.'.|  ||  |'.'|  |      ,--.(  .-'  
    |   ,'.   ||  |   |  |.--.  |  |.-'  `) 
    '--'   '--'`--'   `--''--'.-'  /`----'  
                              '---'         

#### Installation

npm install

bower install


#### Creating Your Own Windows

```javascript

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.CustomWindow = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_blank.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('custom_window', 'custom window', '*',
      					   wmJs.Views.CustomWindow);
})();

```
