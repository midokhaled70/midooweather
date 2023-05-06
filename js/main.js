alert("صلي علي رسول الله ياباشا")

var searchInput=document.getElementById("searchInput");
var find=document.getElementById("find");
var alert=document.getElementById("alertsearchInput");

//today
let cityName=document.getElementById("cityName");
let todayTem=document.getElementById("today-temp");
let todayIcon=document.getElementById("today-icon");
let todayText=document.getElementById("today-text");
let willRain=document.getElementById("willRain");
let wind=document.getElementById("wind");
let direction=document.getElementById("direction");






///date
let todayname=document.getElementById("todayname");
let todaydate=document.getElementById("date");
let tomname=document.getElementById("tom-name");
let aftomname=document.getElementById("afttom-name");

///tomorrow
let tomIcon=document.getElementById("tom-icon");
let TomMinTem=document.getElementById("tom-min-tem");
let ToMaxTem=document.getElementById("tom-max-tem");
let tomText=document.getElementById("tom-text");

//after tom
let aftomIcon=document.getElementById("afttom-icon");
let afTomMinTem=document.getElementById("afttom-min-tem");
let afTomMaxTem=document.getElementById("afttom-max-tem");
let aftomText=document.getElementById("afttom-text");


var date=new Date();

var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var today=days[date.getDay()];
console.log(today);

var tom="";
var aftertom="";
if(date.getDay()==6){
    tom=days[0]; 
    aftertom=days[1];

}else{
    tom=days[date.getDay()+1];
   console.log(tom);
    aftertom=days[date.getDate()+2];
    console.log(aftertom);
}
 
var monthNum=date.getMonth()+1;

var monthname="";
if(monthNum==1){
    monthname="January";
}else if(monthNum==2){
    monthname="February";
}else if(monthNum==3){
    monthname="March";
}
else if(monthNum==4){
monthname=="April";
}else if(monthNum==5){
    monthname="May";
}else if(monthNum==6){
    monthname="June";
}else if(monthNum==7){
    monthname="July";
}
else if(monthNum==8){
    monthname="August";
}
else if(monthNum==9){
    monthname="September";
}
else if(monthNum==10){
    monthname="Octobar";
}
else if(monthNum==11){
    monthname="Novamber";
}
else if(monthNum==12 ){
    monthname="December";
}
console.log(monthNum);
console.log(monthname ); 

todayname.innerHTML=today;
todaydate.innerHTML=monthNum+" "+monthname;

tomname.innerHTML=tom;
aftomname.innerHTML=aftertom; 

//fetch data
var data;
function getdata(akh){
var myhttp=new XMLHttpRequest();
myhttp.open("GET",`https://api.weatherapi.com/v1/forecast.json?key=a8d794b849944fa381d135614230405&q=${akh}&days=3`);

myhttp.send();

myhttp.addEventListener("readystatechange",function(){
    if(myhttp.readyState==4&&myhttp.status==200){
        alert.classList.remove("d-none")
        data=JSON.parse(myhttp.response);
        console.log(data);
        cityName.innerHTML=data.location.name;

        todayTem.innerHTML=data.current.temp_c;
        todayIcon.setAttribute("src",`https:${data.current.condition.icon}`);
        todayText.innerHTML=data.current.condition.text;
        willRain.innerHTML=data.forecast.forecastday[0].day.daily_will_it_rain;
        wind.innerHTML=data.current.wind_kph;
        direction .innerHTML=data.current.wind_dir;
//tom 
tomIcon.setAttribute("src",`https:${data.forecast.forecastday[1].day.condition.icon}`);
TomMinTem.innerHTML=data.forecast.forecastday[1].day.mintemp_c;
ToMaxTem.innerHTML=data.forecast.forecastday[1].day.maxtemp_c;
tomText.innerHTML=data.forecast.forecastday[1].day.condition.text;

///afttommorw
aftomIcon.setAttribute("src",`https:${data.forecast.forecastday[2].day.condition.icon}`);
afTomMinTem.innerHTML=data.forecast.forecastday[2].day.mintemp_c;
afTomMaxTem.innerHTML=data.forecast.forecastday[2].day.maxtemp_c;
aftomText.innerHTML=data.forecast.forecastday[2].day.condition.text;
    }
    else if(myhttp.status!=200||searchInput.value==""){
        alert.classList.add("d-none")
    }
})


}

searchInput.addEventListener("keyup",function(){
    getdata(searchInput.value);
    console.clear();
})
getdata("cairo");