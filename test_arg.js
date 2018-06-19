var a = function(a, b, c){
  console.log(arguments);
  console.log(a+b+c);
  arguments.callee(...arguments);
}

// a(1,2,3);

var b = (a, b) => {
  console.log(arguments);
}

b(1, 2);
