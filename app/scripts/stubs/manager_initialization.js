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

    var app1 = wmJs.Data.WindowedApplication.create({factoryKey: 'blank_window', display: 'blank window'}),
        app2 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_form', display: 'window form'}),
        app3 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_launcher', display: 'window launcher'}),
        app4 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_logger', display: 'window logger'}),
        app5 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_timer', display: 'timer'}),
        app6 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_map_display', display: 'map display'}),

        ws0  = wmJs.Data.Workspace.create({isDefault: true}),
        ws1  = wmJs.Data.Workspace.create({isDefault: false, display: 'todo'}),


        win1 = wmJs.Data.WindowedApplicationInstance.create({
            left: 150, 
            top: 50,
            appId: app1.id,
            workspaceId: ws0.id            
        }),

        win2 = wmJs.Data.WindowedApplicationInstance.create({
            left: 376, 
            top: 50,
            appId: app4.id,
            workspaceId: ws0.id                  
        }),

        win3 = wmJs.Data.WindowedApplicationInstance.create({
            left: 600, 
            top: 50,
            appId: app5.id,
            workspaceId: ws0.id
        }),

        win4 = wmJs.Data.WindowedApplicationInstance.create({
            left: 7, 
            top: 50, 
            height: 540, 
            width:127, 
            appId: app3.id,
            workspaceId: ws0.id
        }),

        win5 = wmJs.Data.WindowedApplicationInstance.create({
            left: 160, 
            top: 320, 
            height: 340, 
            width:637, 
            appId: app6.id,     //app2.id,
            workspaceId: ws0.id
        }),

        win6 = wmJs.Data.WindowedApplicationInstance.create({
            left: 827, 
            top: 50,
            width: 240,
            height: 611,
            appId: app4.id,
            workspaceId: ws0.id                  
        });    





    var db = new wmJs.Persistence.InMemoryPersist({
        windows: [
            win1,win2,win3, win4, win5, win6
        ],
        workspaces: [
            ws0,ws1
        ],
        applications: [
            app1,app2,app3,app4,app5, app6
        ]
    });
    return db;
};