$(function(){
	
	var apikey = '4f99baedbcc957fe61045d279747bd02'; // Instruct Key
	var apiUrl = 'https://api.forecast.io/forecast/';
	var suffix = '?units=si&callback=?';
	
	var skycons = new Skycons({"color": "black"});
	// start animation!
	skycons.play();

	navigator.geolocation.getCurrentPosition(sucess, error);
	
	function sucess(position){
		console.log('Successfully got Weather.');
		
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;
		
		$.getJSON(apiUrl + apikey + '/' + latitude + ',' + longitude + suffix,function(data){
			console.log(data);			

			var timezone = data.timezone;
			var icon = data.currently.icon;
			var temperature = data.currently.temperature;
			var summary = data.currently.summary;
			var daily = data.daily.data;

			document.getElementById("latitude").innerHTML = latitude;
			document.getElementById("longitude").innerHTML = longitude;
			document.getElementById("Location").innerHTML = timezone;
			skycons.set("icon11", icon);
			document.getElementById("Desc0").innerHTML = icon.replace("-", " ");
			document.getElementById("Temp").innerHTML = temperature + " °C";
			document.getElementById("Summary").innerHTML = summary;

			for(var i = 0;i<8;i++){ // daily information.
				skycons.set("icon_" + i, daily[i].icon);
                document.getElementById("Day_"+i).innerHTML = new Date(daily[i].time*1000).toGMTString().substr(0, 11);
				document.getElementById("Desc_"+i).innerHTML = daily[i].icon.replace("-", " ").replace("-", " ");
				document.getElementById("Min_"+i).innerHTML = 'Min: ' + daily[i].temperatureMin + " °C";
				document.getElementById("Max_"+i).innerHTML = 'Max: ' + daily[i].temperatureMax + " °C";
			}
		});
	}
	
	function error(){
		console.log('UnSuccessfull. Did not get weather.');
	}
})	

