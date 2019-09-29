<?php

class wallet{
	
  function index($arg){
	  
	core::include_if_exist("models","wallet_model");
	$content = core::call_if_exist("wallet_model","view",array());
	
	//core::include_if_exist("views","wallet_index");
	//$page = core::call_if_exist("wallet_index","main",array(
	//	'content' => $content,
	//
	//));
	
	header('Content-Type: application/json');
	return json_encode($content);

	

  }
  function create_table (){
	
	
	core::include_if_exist("models","wallet_model");
	$content = core::call_if_exist("wallet_model","create_table",array());
	return $content;
  }
  
  function create_form (){
	

	
	core::include_if_exist("views","wallet_create_form");
	$page = core::call_if_exist("wallet_create_form","main",array(
		
	));
	return $page;
  }
  
  function create (){
	  
	core::include_if_exist("models","wallet_model");
	$page = core::call_if_exist("wallet_model","create",array(
		'name'=>$_POST["name"],
		'hashkey'=>"hash",
	));
	
	//return $page;
	header('Location: /copeland/?ent_type=wallet&action=index&entity='); exit;
	
  }
 }
?>