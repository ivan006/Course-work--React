<?php

class core{

  function include_if_exist($folder,$file_class){
	
	if(file_exists($folder."/".$file_class.".php")){
		include($folder."/".$file_class.".php");
	}	else {
		$errors = "ERROR 404";
	}
	if(isset($errors)){
		return $errors;
	}
	

  }
  function call_if_exist($file_class,$method, $arguments){
	
	
	if(method_exists($file_class, $method) ){
		return $file_class::$method($arguments);
	} else {
		$errors = "ERROR 404";
	}
	

  }
  
  function login_details(){
	
	$login_details = array(
		"servername" => "localhost",
		"username" => "root",
		"password" => "",
		"db" => "copeland",
		"status" => "",
	
	);
	

	$conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"]);

	if (!$conn->connect_error) {
		$login_details["status"] = "accessable db";
	} else {
		$login_details["status"] = "inaccessable db";
	}
	//$conn->close();
	return $login_details;
	
	

  }

 }
?>