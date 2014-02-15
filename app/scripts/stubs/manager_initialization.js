window.Stubs = window.Stubs || {}


window.wschange1 = function (app) {
    var b = store.get(app);
    b.workspaceId = 'workspace_1';
    store.set(app, b);
};

window.Stubs.storeData0 = function () {
    if(!store.enabled){
        console.log('local storage failure');
    }
    //appIdPool
    store.set('appIdPool', ['app_1','app_2','app_3','app_4','app_5','app_6']);

    //workspaceIdPool
    store.set('workspaceIdPool', ['workspace_1','workspace_2','workspace_3','workspace_4']);

    //appInstIdPool
    store.set('appInstIdPool', ['appInst_1','appInst_2','appInst_3','appInst_4','appInst_5','appInst_6']);

    var app1 = wmJs.Data.WindowedApplication.create({factoryKey: 'blank_window', display: 'blank window'});
    store.set('app_1', app1.values);

    var app2 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_form', display: 'window form'});
    store.set('app_2', app2.values);

    var app3 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_launcher', display: 'window launcher'});
    store.set('app_3', app3.values);

    var app4 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_logger', display: 'window logger'});
    store.set('app_4', app4.values);

    var app5 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_timer', display: 'timer'});
    store.set('app_5', app5.values);

    var app6 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_map_display', display: 'map display'});
    store.set('app_6', app6.values);


    var workspace1  = wmJs.Data.Workspace.create({isDefault: true, display: '2'});
    store.set('workspace_1', workspace1.values);

    var workspace2  = wmJs.Data.Workspace.create({isDefault: false, display: '2'});
    store.set('workspace_2', workspace2.values);

    var workspace3  = wmJs.Data.Workspace.create({isDefault: false, display: '3'});
    store.set('workspace_3', workspace3.values);

    var workspace4  = wmJs.Data.Workspace.create({isDefault: false, display: '4'});
    store.set('workspace_4', workspace4.values);


    var appInst1 = wmJs.Data.WindowedApplicationInstance.create({
            left: 150, 
            top: 50,
            appId: 'app_1',
            workspaceId: 'workspace_1'            
        });
    store.set('appInst_1', appInst1.values);

    var appInst2 = wmJs.Data.WindowedApplicationInstance.create({
            left: 376, 
            top: 50,
            appId: 'app_4',
            workspaceId: 'workspace_1'                  
        });
    store.set('appInst_2', appInst2.values);

    var appInst3 = wmJs.Data.WindowedApplicationInstance.create({
            left: 600, 
            top: 50,
            appId: 'app_5',
            workspaceId: 'workspace_1'
        });
    store.set('appInst_3', appInst3.values);

    var appInst4 = wmJs.Data.WindowedApplicationInstance.create({
            left: 7, 
            top: 50, 
            height: 540, 
            width:127, 
            appId: 'app_3',
            workspaceId: 'workspace_1'
        });
    store.set('appInst_4', appInst4.values);

    var appInst5 = wmJs.Data.WindowedApplicationInstance.create({
            left: 160, 
            top: 320, 
            height: 340, 
            width:637, 
            appId: 'app_6',
            workspaceId: 'workspace_1'
        });
    store.set('appInst_5', appInst5.values);

    var appInst6 = wmJs.Data.WindowedApplicationInstance.create({
            left: 827, 
            top: 50,
            width: 240,
            height: 611,
            appId: 'app_4',
            workspaceId: 'workspace_1'                  
        });
        store.set('appInst_6', appInst6.values);    
    return 'ok';
};

window.Stubs.storeData1 = function () {
    if(!store.enabled){
        console.log('local storage failure');
    }
    //appIdPool
    store.set('appIdPool', ['app_1','app_2','app_3','app_4','app_5','app_6','app_7']);

    //workspaceIdPool
    store.set('workspaceIdPool', ['workspace_1','workspace_2','workspace_3','workspace_4']);

    //appInstIdPool
    store.set('appInstIdPool', ['appInst_1']);

    var app1 = wmJs.Data.WindowedApplication.create({factoryKey: 'blank_window', display: 'blank window'});
    store.set('app_1', app1.values);

    var app2 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_form', display: 'window form'});
    store.set('app_2', app2.values);

    var app3 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_launcher', display: 'window launcher'});
    store.set('app_3', app3.values);

    var app4 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_logger', display: 'window logger'});
    store.set('app_4', app4.values);

    var app5 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_timer', display: 'timer'});
    store.set('app_5', app5.values);

    var app6 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_map_display', display: 'map display'});
    store.set('app_6', app6.values);

    var app7 = wmJs.Data.WindowedApplication.create({factoryKey: 'window_table', display: 'table'});
    store.set('app_7', app7.values);

    var workspace1  = wmJs.Data.Workspace.create({isDefault: true, display: '1'});
    store.set('workspace_1', workspace1.values);

    var workspace2  = wmJs.Data.Workspace.create({isDefault: false, display: '2'});
    store.set('workspace_2', workspace2.values);

    var workspace3  = wmJs.Data.Workspace.create({isDefault: false, display: '3'});
    store.set('workspace_3', workspace3.values);

    var workspace4  = wmJs.Data.Workspace.create({isDefault: false, display: '4'});
    store.set('workspace_4', workspace4.values);

    var appInst1 = wmJs.Data.WindowedApplicationInstance.create({
            left: 7, 
            top: 50, 
            height: 540, 
            width:127, 
            appId: 'app_3',
            workspaceId: 'workspace_1'
        });
    store.set('appInst_1', appInst1.values);
 
    return 'ok';
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
            appId: app1.id, //blank
            workspaceId: ws0.id            
        }),

        win2 = wmJs.Data.WindowedApplicationInstance.create({
            left: 376, 
            top: 50,
            appId: app4.id, //logger
            workspaceId: ws0.id                  
        }),

        win3 = wmJs.Data.WindowedApplicationInstance.create({
            left: 600, 
            top: 50,
            appId: app5.id, //timer
            workspaceId: ws0.id
        }),

        win4 = wmJs.Data.WindowedApplicationInstance.create({
            left: 7, 
            top: 50, 
            height: 540, 
            width:127, 
            appId: app3.id, //launcher
            workspaceId: ws0.id
        }),

        win5 = wmJs.Data.WindowedApplicationInstance.create({
            left: 160, 
            top: 320, 
            height: 340, 
            width:637, 
            appId: app6.id,     //map,
            workspaceId: ws0.id
        }),

        win6 = wmJs.Data.WindowedApplicationInstance.create({
            left: 827, 
            top: 50,
            width: 240,
            height: 611,
            appId: app4.id, //logger
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