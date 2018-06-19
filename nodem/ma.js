/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-03-16 19:40:31
 * @version $Id$
 */
var a = 1;


function seta(){
    a = 2;
}

function geta(){
  return a;
}

module.exports={
    seta:seta,
    geta:geta
}



