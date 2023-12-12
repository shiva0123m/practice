const http=require('http');
const fs=require('fs');
var requests=require('requests');

const homeFile=fs.readFileSync("home.html","utf-8");
const replaceVal=(tempval,orgVal)=>{
    let temperature=tempval.replace("{%temp%}",orgVal.main.temp);
    temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature=temperature.replace("{%city%}",orgVal.name);
    temperature=temperature.replace("{%country%}",orgVal.sys.country);
    return temperature;
}
const server=http.createServer((req,res)=>{
if(req.url=="/")
{
requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=fd4ac3c42205a7127ff012e0ef9af7b2")

.on("data",(chunk)=>{
    const obj=JSON.parse(chunk);
    const arrdata=[obj];
    // console.log(arrdata[0].main.temp);
    const realtimedata=arrdata.map((val)=>
        replaceVal(homeFile,val)).join("");
    res.write(realtimedata);
})
.on("end",(err)=>{
    if(err)
    {
        console.log("Connection is closed due to error");
    }
    res.end();
});
}
});

server.listen(8000,"127.0.0.1");