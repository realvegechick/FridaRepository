var search="12345"
var save=null
var button=null
var listener=null
function click(key){
	search=key
	listener.onClick(button)
}
Java.perform(function(){
	var Exception = Java.use('java.lang.Exception');
	function stackTraceHere(){
		var Log = Java.use('android.util.Log');
		console.log(Log.getStackTraceString(Exception.$new()))
	}
	var String = Java.use("java.lang.String")
	console.log("script loaded")
	var log=Java.use("com.tencent.mm.sdk.platformtools.Log")
	log.i.overload('java.lang.String', 'java.lang.String', '[Ljava.lang.Object;').implementation=function(arg1,arg2,arg3){
		if(String.$new(arg1).contains(String.$new("MicroMsg.WebSearch.PGetController")) && String.$new(arg2).contains(String.$new("cgiResult:%s"))){
			console.log(arg3[2].toString())
			stackTraceHere()
		}
		return this.i(arg1,arg2,arg3)
	}
	Java.choose('com.tencent.mm.plugin.webview.ui.tools.fts.MMFTSSearchTabWebViewUI', {
		onMatch: function(instance) {
			button=instance.findViewById(2131312714)
		},
		onComplete: function() {}
	});
	Java.choose('com.tencent.mm.ui.search.FTSEditTextView$e', {
		onMatch: function(instance) {
			listener = instance;
		},
		onComplete: function() {}
	});
	var text=Java.use("com.tencent.mm.ui.search.FTSEditTextView")
	text.getInEditTextQuery.implementation=function(){
		//stackTraceHere()
		var ret=this.getInEditTextQuery()
		//console.log(ret)
		return String.$new(search)
	}
	text.getTotalQuery.implementation=function(){
		//stackTraceHere()
		var ret=this.getTotalQuery()
		//console.log(ret)
		return String.$new(search)

	}
})




