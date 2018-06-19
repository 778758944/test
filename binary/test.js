/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-18 17:17:19
 * @version $Id$
 */
var fs=require('fs');


fs.readFile('./aa',function(err,buffer){
	console.log(buffer);
});

var str='AB的';

console.log(new Buffer(str,'utf8'));
















