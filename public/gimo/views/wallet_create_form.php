<?php
class wallet_create_form{
  function main($ar){
	ob_start();
	?>
	

	<form action="/copeland/?ent_type=wallet&action=create&entity=" method="post">
	  id: will be auto assigned<br>
	  name: <input type="text" name="name"><br>
	  hashkey:  will be auto assigned<br>
	  <input type="submit" value="Submit">
	</form>






	<?php
	$out1 = ob_get_contents();
	ob_end_clean();
	return $out1;
  }
 }
?>