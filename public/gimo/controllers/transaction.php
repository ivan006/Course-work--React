<?php

class transaction{
	
  function index($arg){
	  

	return 1;
	

  }
  function create_table (){
	
	
	core::include_if_exist("models","transaction_model");
	$content = core::call_if_exist("transaction_model","create_table",array());
	return $content;
  }
 }
?>