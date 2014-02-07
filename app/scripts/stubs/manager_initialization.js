window.Stubs = window.Stubs || {}


window.Stubs.testData = function () {
	return {
        el: '#app',

        WorkspaceConfig: { data: { id: 1, display:'default', height: 2000, width: 2000 } },

        WindowFactory: WM.WindowedApplicationFactory
                         .getWindowedApplication,

        WindowTypes: WM.WindowedApplicationFactory
                         .registeredApplicationsInfo,

        WindowConfigList: { data: [
                    WM.BlankWindowFactory.mkWindow({
                        left: 150, 
                        top: 50
                    }),

                    WM.BlankWindowFactory.mkWindow({
                        left: 376, 
                        top: 50,
                        factoryKey: 'window_logger', 
                        display: 'logger'                         
                    }),

                    WM.BlankWindowFactory.mkWindow({
                        left: 600, 
                        top: 50,
                        factoryKey: 'window_timer', 
                        display: 'timer' 
                    }),

                    WM.BlankWindowFactory.mkWindow({
                        left: 7, 
                        top: 50, 
                        height: 540, 
                        width:127, 
                        factoryKey: 'window_launcher', 
                        display: 'launcher' 
                    }),

                    WM.BlankWindowFactory.mkWindow({
                        left: 160, 
                        top: 320, 
                        height: 340, 
                        width:637, 
                        factoryKey: 'window_form', 
                        display: 'input form' 
                    }),

                    WM.BlankWindowFactory.mkWindow({
                        left: 827, 
                        top: 50,
                        width: 240,
                        height: 611,
                        factoryKey: 'window_logger', 
                        display: 'logger'                         
                    }),                    
                    /*,

                    WM.BlankWindowFactory.mkWindow({
                        left: 7, 
                        top: 50, 
                        height: 540, 
                        width:127, 
                        factoryKey: 'window_logger', 
                        display: 'logger' 
                    }),*/


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

        WindowTypes: WM.WindowedApplicationFactory
                         .registeredApplicationsInfo,

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


window.Stubs.testData3 = function () {
    var win0 = wmJs.Data.WindowedApplicationInstance.create({
        left: 150, 
        top: 50                                    
    });
    var win1 = wmJs.Data.WindowedApplicationInstance.create({
        left: 376, 
        top: 50                                     
    });    
    var db = new wmJs.Persistence.InMemoryPersist({
        windows: [{key: win0.id, value: win0}, {key: win1.id, value: win1}],
        workspaces: [
            wmJs.Data.Workspace.create()
        ]
    });
    return db;
};