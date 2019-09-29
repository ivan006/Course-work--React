
<?php
$xmlstr = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
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
XML;
?>

<?php
// include 'example.php';

$movies = new SimpleXMLElement($xmlstr);

echo $movies->expression[0]->add->number;
?>
