// console.log("hello World");
// var a=20;
// console.log("a="+a);

// console.log(a);
//  let a=20;

// let a=30;
// if(a>20){
//     let a=50;
//     console.log("a inside value="+a);
// }else{
//     console.log("Inside else statement")
// }
// console.log("a ouside value"+a);


//function as an expression
// const data=function(msg){
//    return "hiiii....helllo"+msg;
// }
// const msg1=data("Good Morning");
// console.log(msg1);

//Arrow function

// const data=(msg)=>{
//     //console.log("hiii...Helllo"+msg);
//     return "hiii...Helllo"+msg;
    
// }
// const data1=data("Good Morning");
// console.log(data1);

// const data=msg=>msg;
// const data1=data("hellloooo");
// console.log(data1);


//IIFE
// (()=>{
//     console.log("Hiiii....Hello");
// })();


//setTimeout(()=>{console.log("hellloooo")},1000);
//setInterval(()=>{console.log("heyyyy.....")},1000);

// function greetings(msg="Hiii"){
// console.log("Hello"+msg);
// }
// greetings("Welcome To ABES");


function selectLanguage(lang){
    let data;
    if(lang=='java'){
        function javaCompiler(){
            return "Hey, Java Compliler calling...";
        }
        data=javaCompiler();
    }else if(lang=='c'){
        function cCompiler(){
            return "hey, c compiler calling";
        }
        data=cCompiler();
    }else{
        data="No compiler available"
    }
return data;
}