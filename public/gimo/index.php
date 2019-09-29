<?php

include("core.php");
//---------------
// default route definition starts here
//---------------

/// if the relevant get parameters arent given it will treat it like these get parameters have been given
// http://localhost/copeland/?ent_type=wallet&action=index&entity=

if (isset($_GET["ent_type"])) {
	$ent_type = $_GET["ent_type"];
} else {
	$ent_type = "wallet";
}
if (isset($_GET["action"])) {
	$action = $_GET["action"];
} else {
	$action = "index";
}

if (isset($_GET["entity"])) {
	$entity = $_GET["entity"];
} else {
	$entity = "";
}
//---------------
// default route definition ends here
//---------------



//---------------
// route execution starts here
//---------------

core::include_if_exist("controllers",$ent_type);
$page = core::call_if_exist($ent_type,$action,array("entity"=>$entity));



echo $page;

//---------------
// route execution end here
//---------------

 
?>