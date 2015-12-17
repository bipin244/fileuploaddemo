if (Meteor.isClient) {
  // counter starts at 0
  Template.hello.events({
    'click #btnUpload': function (){
		var file = document.getElementById('my_file').files[0];
		var imageType = /image.*/;
		if(file.type.match(imageType)){//== "image/jpeg" || file.type == "image/png" || file.type == "image/jpg" || file.type == "image/gif" ){
			var reader = new FileReader(); //create a reader according to HTML5 File API
			var res = file.name.split(".");
			$(".uplodLoading").show();
			var fileName = moment(new Date()).format("YYYYMMDDTHHmmss")+"."+res[1];
			Resizer.resize(file, {width: 32, height: 32, cropSquare: true}, function(err, result1){
				reader.onload = function(event){          
					var buffer = new Uint8Array(reader.result) // convert to binary
					Meteor.call('saveFile',"img",buffer,"thamb"+fileName,function(err,res){
						if(res){
							Resizer.resize(file, {width: 200, height: 200, cropSquare: true}, function(err, result){
								reader.onload = function(event){          
									var buffer = new Uint8Array(reader.result) // convert to binary
									Meteor.call('saveFile',"img/",buffer,fileName,function(err,res){
										if(res){
											$(".uplodLoading").hide();
											$("#profileChangeMsg").show();
											setTimeout(function() {
												$("#modalProfileIcon").modal("hide");
												$("#profileChangeMsg").hide();
											}, 1000);
										}
									});
								}
								reader.readAsArrayBuffer(result); //read the file as arraybuffer*/
							});
						}
					});
				}
				reader.readAsArrayBuffer(result1); //read the file as arraybuffer*/
			});
		}else{
			Meteor.errorMessagesFunction.showMsg("changeProfile","Invalid File Format");
			$("#changeProfile").css("border-color","red");
			$("#changeProfile").click(function(){
				$("#changeProfile").popover('destroy');
				$("#changeProfile").css("border-color","#FFF");
				$("#changeProfile").css("border-color","#FFF");
			});
		}
	},
	'click .cooseFile' : function(){
		$("input[id='my_file']").click();
	},
	'change #my_file' : function(event){
		readURL(event.target);
	}
  });
  
function readURL(input){
	if (input.files && input.files[0]){
		var reader = new FileReader();
		var imageType = /image.*/;
		if(input.files[0].type.match(imageType)){//== "image/jpeg" || input.files[0].type == "image/png" || input.files[0].type == "image/jpg" || input.files[0].type == "image/gif" ){
			reader.onload = function (e) {
				$('#changeProfile').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
			$('#btnUpload').removeAttr('disabled');
		}else{
			Meteor.errorMessagesFunction.showMsg("changeProfile","Invalid File Format");
			$("#changeProfile").css("border-color","red");
			reader.onload = function (e) {
				$('#changeProfile').attr('src',"/upload/Deletion_icon.svg.png");
			}
			reader.readAsDataURL(input.files[0]);
			$("#changeProfileFocus").click(function(){
				$("#changeProfile").popover('destroy');
				$("#changeProfile").css("border-color","#FFF");
				$("#changeProfile").css("border-color","#FFF");
			});
		}
	}
}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
