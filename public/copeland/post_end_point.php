<?php


function xml_to_array($xml) {
  $array = $xml;
  $array = simplexml_load_string($array, "SimpleXMLElement", LIBXML_NOCDATA);
  $array = json_encode($array,JSON_PRETTY_PRINT);
  $array = json_decode($array,TRUE);
  return $array;
}

// function exp_from_exp(){
//
// }
function exp_array_to_exp_string($exp_array){
  if (!function_exists("exp_array_to_exp_string_helper")) {
    function exp_array_to_exp_string_helper($exp_array,$parentKey,$operators){
      if ($parentKey === "number") {
        $exp_array = array_values($exp_array)[0];
      }
      $i = 0;
      foreach ($exp_array as $key => $value) {
        if ($i < 2) {
          if (is_array($value)) {
            if ($key === "number" & is_array($value)) {
              $keyToPass = $parentKey;
            } else {
              $keyToPass = $key;
            }
            $num[$i] = exp_array_to_exp_string_helper($value,$keyToPass,$operators);
          } else {
            $num[$i] = $value;
          }
        }
        if (isset($num[0]) & isset($num[1])) {
          $result = "".$num[0]."".$operators[$parentKey]."".$num[1]."";
        } else {
          $result = $num[0];
        }
        $i ++;
      }
      return $result;
    }
  }
  $operators = array(
    'add' => '+',
    'minus' => '-',
    'divide' => '/',
    'multiply' => '*'
  );
  $key = "";
  $result = exp_array_to_exp_string_helper($exp_array,$key,$operators);
  return $result;
}

function exp_string_to_exp_result($exp_string){
  eval("\$result = $exp_string;");
  return $result."<br>";
}



$input_xml = $_POST["input_xml"];

$input_array = xml_to_array($input_xml);


$exp_array = $input_array['expression'][0];
echo "<pre>".json_encode($exp_array,JSON_PRETTY_PRINT)."</pre>";
$exp_string = exp_array_to_exp_string($exp_array);
$exp_result = exp_string_to_exp_result($exp_string);
echo $exp_string."=".$exp_result;


$exp_array = $input_array['expression'][1];
echo "<pre>".json_encode($exp_array,JSON_PRETTY_PRINT)."</pre>";
$exp_string = exp_array_to_exp_string($exp_array);
$exp_result = exp_string_to_exp_result($exp_string);
echo $exp_string."=".$exp_result;




?>
