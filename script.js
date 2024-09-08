const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){//select element from dropdown class

    for(currCode in countryList){//codes.js 
        let newOption=document.createElement("option");//create all currency in select element.
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);//append in select element
        if(select.name==="From" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="To" && currCode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        //console.log(evt.target);
       updateFlag(evt.target);//it gives in select element where is change by changed event.
    })
}


const updateFlag=(element)=>{
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
}

const updateExchange= async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue===''||amtValue<1){
        amtValue=1
        amount.value="1";
    }

    let amtValue1=amtValue;
    const url=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_f3j7RL3b31HwHfVjoof8j3Ee7jf3YGBSlckHTlK0`
    let response= await fetch(url);
    let data=await response.json();
    let rate=data["data"];
    amtValue=amtValue*(1/rate[fromCurr.value]);//here all currency converted into usd.
    let finalAmount=amtValue*rate[toCurr.value];
    msg.innerText=`${amtValue1}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
}

btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
updateExchange();
})

window.addEventListener("load",()=>{//here load is window event or we can say it when refresh a page means load this page again this work is done by window object;
    updateExchange();
})