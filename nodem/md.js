/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-03-16 19:42:58
 * @version $Id$
 */
var mb = require('./mb');
var mc = require('./mc');
console.log(mc.geta());

mb.seta();
setTimeout(function(){
  console.log(mc.geta());
},5000);
