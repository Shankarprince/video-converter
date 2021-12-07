const ipc = require("electron").ipcRenderer

const button = document.getElementById("upload")

const randomString = require("random-string")

const process = require("child_process")

var format = "mp3"

const fs = require("fs")

const $ = require("jquery")

var dir = "./media"

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

$("#format").change(function(){
    format = $("#format option:selected").text()
    // ipc.send("open-file-dialog-for-file")
})

button.addEventListener("click", function(event){
    ipc.send("open-file-dialog-for-file")
})

ipc.on("selected-file", function(event,paths){
    console.log(event)

    console.log(paths)

    var randomid = randomString()

    $("#info").append(`
            <br><br>
            <div id=${randomid} class="alert alert-sucess">
            ${paths} is converting So please wait
            </div>
        `)

    // execution of conversion using ffmpeg

    process.exec(`ffmpeg -i "${paths}" media/${randomString()}_video.${format}`, function(error, stdout, stderr){
        console.log(stdout)

        $(`#${randomid}`).detach()

        Notification.requestPermission()
            .then(function(result){
                var myNotification = new Notification("Conversion Completed!!!",{
                    body: "Your file was successfully converted"
                })
        })
 
        if(error !== null){
            console.log(error)
        }
    })
})