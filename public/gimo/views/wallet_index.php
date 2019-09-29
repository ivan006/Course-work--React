<?php
class wallet_index{
  function main($ar){
	ob_start();
	?>
	
	
	
	
	
	<pre>
	<?php var_dump($ar['content']); ?>
	</pre>

	hi!







	<?php
	$out1 = ob_get_contents();
	ob_end_clean();
	return $out1;
  }
 }
?>