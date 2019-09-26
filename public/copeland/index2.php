<?php
ob_start();

?>

<expressions>
  <expression>
    <add>
      <number>1</number>
      <multiply>
        <number>2</number>
        <number>8</number>
      </multiply>
    </add>
  </expression>
  <expression>
    <minus>
      <divide>
        <number>1</number>
        <number>2</number>
      </divide>
      <number>8</number>
    </minus>
  </expression>
</expressions>
<?php

$thing = ob_get_contents();

ob_end_clean();

$thing = simplexml_load_string($thing, "SimpleXMLElement", LIBXML_NOCDATA);
$thing = json_encode($thing);
$thing = json_decode($thing,TRUE);

// echo $thing;
echo "<pre>";
var_dump($thing);
echo "</pre>";
?>
