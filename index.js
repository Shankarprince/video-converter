

var app = require("electron").app;
var BrowserWindow = require("electron").BrowserWindow;
var mainWindow;
var ipc = require("electron").ipcMain;
const os = require("os");
var { dialog } = require("electron");;

ipc.on("close-main-window", function(){
    app.quit();
});

app.on("ready", function(){
    mainWindow = new BrowserWindow({
        resizable : true,
        height:600,
        width: 800,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false,
            enableRemoteModule: true
        }
});   
    
mainWindow.loadURL("file://" + __dirname + "/main.html");
    mainWindow.on("closed", function(){
        mainWindow = null;
    });
});

ipc.on("open-file-dialog-for-file", function(event){
    console.log("button pressed")
    console.log(event);
    if(os.platform()  === "linux" || os.platform() === "win32"){
        dialog.showOpenDialog(null, {
            properties:["openFile"]
        }).then((result) => {
            console.log(result.filePaths)
            event.sender.send("selected-file", result.filePaths[0])
        }).catch((err) => {
            console.log(err)
        })
    }
    else{
        dialog.showOpenDialog({
            properties:["openFile", "openDirectory"]
        }, function (files) {
            if (files) event.sender.send('selected-file', files[0]);
        });
    }
});
 
 