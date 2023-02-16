function stackTraceHere(){
    var Exception = Java.use('java.lang.Exception');
    var Log = Java.use('android.util.Log');
    console.log(Log.getStackTraceString(Exception.$new()))
}
var File = Java.use('java.io.File')
var FileOutputStream = Java.use('java.io.FileOutputStream')
var FileInputStream= Java.use('java.io.FileInputStream')
var ObjectOutputStream = Java.use('java.io.ObjectOutputStream')
var ObjectInputStream = Java.use('java.io.ObjectInputStream')
var saveBytes = function(bytes,path){
    var file = File.$new(path)
    if(file.exists()){
        file.delete()
    }
    file.createNewFile()
    var fOut = FileOutputStream.$new(file)
    fOut.write(bytes)
    fOut.flush()
    fOut.close()
}
var readBytes = function(path){
    var file = File.$new(path)
    if(!file.exists()){
        console.log("file is missing!")
    }
    var fIn = FileInputStream.$new(file)
    var len = fIn.available()
    var array = new Array(len).fill(0)
    var b = Java.array('byte', array)
    fIn.read(b)
    fIn.close()
    return b
}
var cnt=0;
var String=Java.use("java.lang.String")
var a="";
function hook_tcp(){
    var worker=Java.use("com.alipay.mobile.common.transport.http.HttpWorker")
    var EntityUtils=Java.use("org.apache.http.util.EntityUtils")
    worker.executeRequest.implementation=function(){
        var tmp=""
        var ret=this.executeRequest()
        //console.log(cnt,"Request:\n",this.getOriginRequest())
        tmp+="==========\n"
        tmp+="Request:"+cnt+"\n"+this.getOriginRequest()+"\n"
        var res=EntityUtils.toString(ret.getEntity())
        //console.log(cnt,"Response:\n",res)
        tmp+="==========\n"
        tmp+="Response:"+cnt+"\n"+res+"\n"
        a+=tmp
        console.log(tmp)
        cnt+=1
        return this.executeRequest()
    }
}

function save(){
    saveBytes(String.$new(a).getBytes(),"/data/local/tmp/pcap/raw.txt")
}
function hook_java(){
    Java.perform(function(){
        hook_tcp();
        setInterval(function(){
            save()
        },1000);
    })
}
function main(){
    hook_java();
}

setImmediate(main);