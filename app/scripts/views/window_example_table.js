/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleTableView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_table.ejs'],

        window_render: function () {
        	this.$windowcontent.html(this.template());
            this.$table = this.$windowcontent.find('.exampletable');

            var table = this.$table.dataTable ?
                        this.$windowcontent.find('.exampletable').dataTable( {
                            "aaData": [
                                /* Reduced data set */
                                [ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X" ],
                                [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C" ],
                                [ "Trident", "Internet Explorer 5.5", "Win 95+", 5.5, "A" ],
                                [ "Trident", "Internet Explorer 6.0", "Win 98+", 6, "A" ],
                                [ "Trident", "Internet Explorer 7.0", "Win XP SP2+", 7, "A" ],
                                [ "Gecko", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8, "A" ],
                                [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A" ],
                                [ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A" ],
                                [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ],
                                [ "Webkit", "Safari 1.3", "OSX.3", 312.8, "A" ],
                                [ "Webkit", "Safari 2.0", "OSX.4+", 419.3, "A" ],
                                [ "Webkit", "Safari 3.0", "OSX.4+", 522.1, "A" ]
                            ],
                            "aoColumns": [
                                { "sTitle": "Engine" },
                                { "sTitle": "Browser" },
                                { "sTitle": "Platform" },
                                { "sTitle": "Version", "sClass": "center" },
                                { "sTitle": "Grade", "sClass": "center" }
                            ],
                            //"sScrollY": "100%",
                            //"sScrollX": "100%",
                            //"sScrollXInner": "110%",
                            "bJQueryUI": true
                        } ) : null;

        }

    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_table', 'table window', '*',
      					   wmJs.Views.WindowExampleTableView);
})();
