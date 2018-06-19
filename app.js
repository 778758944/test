/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-29 11:01:22
 * @version $Id$
 */

require('babel-register')({
	presets:['es2015','react']
})
import HelloMessage from './src/components/components'
var path=require('path');
require('node-jsx').install({
	extension:'.jsx'
})

var express=require('express'),
	app=express(),
	React=require('react'),
	ReactDOM=require('react-dom/server');




var Hello=React.createFactory(HelloMessage)
app.engine('jade',require('jade').__express)
app.set('view engine','jade');


app.use(express.static(__dirname+'/public'))

app.get('/',function(req,res){
	res.render('index',{
		react:ReactDOM.renderToString(Hello({name:'messi'}))
	})
})

app.listen(3001,function(){
	console.log('listen on port 3001...')
})







































