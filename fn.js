/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-20 10:21:45
 * @version $Id$
 */
function add(a,b){
	// console.log(this===global);
	// console.log(arguments);
	// console.log(Array.prototype.slice.call(arguments,1));
	console.log(a+b);
	testThis();
}

add(1,2);

var a={name:'jack'};



Function.prototype.bind=function(that){
	var self=this,
		args=arguments.length>1 ? Array.prototype.slice.call(arguments,1):null,
		F=function(){

		};

		var bound=function(){
			var context=that,
				length=arguments.length;
			// console.log(this==window);
			if(this instanceof bound){
				F.prototype=self.prototype;
				context=new F;
			}

			var result=(!args && !length) ? self.call(context):self.apply(context,args && length ? args.concat(Array.prototype.slice.call(arguments)):args || arguments);
			return context == that ? result : context
		}
		return bound;
}

Function.prototype.wait=function(cond,scope,that,i){
	var t=this,
		waitFn=function(){
			if(cond.call(scope || window)){
				t.call(that || scope || window);
			}else{
				setTimeout(waitFn,i || 5000);
			}
		}
		waitFn();
}

function testThis(){
	// console.log('window',this===global);
}

var getName=function(a,b){
	console.log(this.name);
	console.log(a+b);
}.bind(a,1,2);


(function(){
	console.log('sdsds');
}).wait(function(){
	setTimeout(function(){
		console.log('dsds');
	},1000)
})

console.log(getName instanceof Object);

// (function(){
// 	console.log("sddsd");
// }).delay();


























