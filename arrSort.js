/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-09-15 19:46:06
 * @version $Id$
 */
var arr = [1,2,3,4,5];
// console.log(arr.sort(function(a,b){
//   return 1;
// }));
// arr.map(function(ele){
//   if(ele == 3){
//     break;
//   }
// })

for(var i = 0; i < 5; i++){
  console.log(arr[i]);
  if(arr[i] == 3){
    break;
  }
}
