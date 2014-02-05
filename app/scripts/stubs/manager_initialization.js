window.Stubs = window.Stubs || {}


window.Stubs.testData = function () {
	return {
        el: '#app',

        WorkspaceConfig: { data: { id: 1, display:'default', height: 2000, width: 2000 } },

        WindowFactory: WM.WindowedApplicationFactory
                         .getWindowedApplication,

        WindowConfigList: { data: [
                    WM.BlankWindowFactory.mkWindow({left: 50,top: 50}),
                    WM.BlankWindowFactory.mkWindow({left: 276,top: 50}),
                    WM.BlankWindowFactory.mkWindow({left: 500,top: 50})
                ]}
	};
};


window.Stubs.testData2 = function () {
	return {
        el: '#app',

        WorkspaceConfig: {
            id: 1,
            url: function (id) {
                return 'view/' + id;
            },
            fromserver: function (data) {
                return {};
            },
            toserver: function (data) {
                return {};
            }
        },

        WindowFactory: WM.WindowedApplicationFactory
                         .getWindowedApplication,

        WindowConfigList: {
            url: function (id) {
                return 'module/user/' + id;
            },
            fromserver: function (data) {
                return {};
            },
            toserver: function (data) {
                return {};
            } 
        }
	};
};

