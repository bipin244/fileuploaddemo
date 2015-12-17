Meteor.methods({
	totalCount: function() {
		return Allpoint.find({}).count();
	},
	countAssets: function(option) {
		return Asset.find(option).count();
	},
	allUser: function(user_name,password) {
		return Meteor.users.findOne({$and: [{username: user_name},{password: password}]});
	},
	countUnreadNot : function(){
		if(this.userId == 'NoGuk2taTeK4o5sQw'){
			return false;
		}else{
			return Alerts.find({"userId":this.userId,"checkNotification":{$exists:false}}).count();
		}
	},
	updateShownNotification:function(){
		if(this.userId == 'NoGuk2taTeK4o5sQw'){
		}else{
			return Alerts.update({ 'userId': this.userId },{$set:{"checkNotification": true}},{multi:true});
		}
	},
	saveFile: function(path,buffer,fileName){
		var fs = Npm.require("fs");
		fs.writeFile('../../../../../.uploads/'+path+'/'+fileName,new Buffer(buffer),function(error,result){
			if (error){
				console.error("write error:  " + error.message);
			}
		});
		if(fileName.indexOf('thamb') === -1){
			Meteor.users.update({_id:this.userId}, { $set:{"profile.profileImage":fileName}})
		}
		return "Done";
	}
});
