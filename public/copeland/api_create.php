<?php



include("login_details.php");

function query($arg){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }



  // sql to create table
  $sql = "INSERT INTO articles (expression, result)
  VALUES ('".$arg['expression']."', '".$arg['result']."')";


  $conn->query($sql);

  $conn->close();


}
function binary_expression_tree_decode($exp_array){
  if (!function_exists("binary_expression_tree_decode_helper")) {
    function binary_expression_tree_decode_helper($exp_array,$parentKey,$operators){
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
            $num[$i] = binary_expression_tree_decode_helper($value,$keyToPass,$operators);
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
  $result = binary_expression_tree_decode_helper($exp_array,$key,$operators);
  return $result;
}

function xml_to_array($xml) {
  $array = $xml;
  $array = simplexml_load_string($array, "SimpleXMLElement", LIBXML_NOCDATA);
  $array = json_encode($array,JSON_PRETTY_PRINT);
  $array = json_decode($array,TRUE);
  return $array;
}

if (isset($_POST["expressions"])) {
  $input_xml = $_POST["expressions"];

  $input_array = xml_to_array($input_xml);
  $input_array = $input_array['expression'];

  foreach ($input_array as $key => $value) {
    $exp_string = binary_expression_tree_decode($value);

    eval("\$exp_result = $exp_string;");

    query(array(
      'expression'=>$exp_string,
      'result'=>$exp_result,
    ));
  }
}

?>
