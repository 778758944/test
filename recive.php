<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-25 14:07:46
 * @version $Id$
 */




$data=$_POST['data'];
$tmp=base64_decode($data);
file_put_contents('./img.png',$tmp);
$path='/test/img.png';
$arr=Array('path'=>$path);
// $arr=Array("path"=>$path);
echo json_encode($arr);

?>