<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-24 15:28:03
 * @version $Id$
 */

// $arr=Array('name'=>$_POST['name']);
// echo $_POST['name'];
// $a=$_FILES['file'];
// echo $a;
$arr=$_FILES['file'];
$path='./upload/'.$_FILES["file"]["name"];
move_uploaded_file($_FILES["file"]["tmp_name"],$path);
echo json_encode(Array('path'=>$path));
?>