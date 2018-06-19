<?php
  echo $_POST["username"];
  echo $_POST["password"];
  echo $_FILES["file"]["tmp_name"];
  move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$_FILES["file"]["name"]);
  echo "hello";
 ?>
