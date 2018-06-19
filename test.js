var str="@95032 @20783137 @471839 hahahhaxhsbxhsbx";
str.replace(/@\d+ /g,function(a,b,c,d){
   console.log(a);
})
var arr=str.match(/@\d+ /g);
console.log(arr);
