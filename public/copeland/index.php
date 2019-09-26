<?php
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
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

    $exp_tree_array_xml = ob_get_contents();

    ob_end_clean();

    function array_from_xml($xml){
      $array = $xml;
      $array = simplexml_load_string($array, "SimpleXMLElement", LIBXML_NOCDATA);
      $array = json_encode($array,JSON_PRETTY_PRINT);
      $array = json_decode($array,TRUE);
    }

    $exp_tree_array = array_from_xml($exp_tree_array_xml);



    // function exp_tree_array_from_exp(){
    //
    // }
    function exp_tree_string_from_exp_tree_array($exp_tree_array){
      function exp_tree_string_from_exp_tree_array_helper($exp_tree_array,$parentKey,$operators){
        if ($parentKey === "number") {
          $exp_tree_array = array_values($exp_tree_array)[0];
        }
        $i = 0;
        foreach ($exp_tree_array as $key => $value) {
          if ($i < 2) {
            if (is_array($value)) {
              if ($key === "number" & is_array($value)) {
                $keyToPass = $parentKey;
              } else {
                $keyToPass = $key;
              }
              $num[$i] = exp_tree_string_from_exp_tree_array_helper($value,$keyToPass,$operators);
            } else {
              $num[$i] = $value;
            }
          }
          if (isset($num[0]) & isset($num[1])) {
            $result = "(".$num[0]." ".$operators[$parentKey]." ".$num[1].")";
          } else {
            $result = $num[0];
          }
          $i ++;
        }
        return $result;
      }
      $operators = array(
        'expression' => 'expression',
        'add' => '+',
        'divide' => '/',
        'minus' => '-',
        'multiply' => '*',
      );
      $key = "baseKey";
      $result = exp_tree_string_from_exp_tree_array_helper($exp_tree_array,$key,$operators);
      return $result;
    }

    $exp_tree_string = exp_tree_string_from_exp_tree_array($exp_tree_array);

    function exp_result($exp_tree_string){
      eval("\$result = $exp;");
      return $result;
    }

    $exp_result = exp_result($exp_tree_string);
    echo $exp_result;

    // $expOne = $thing_array['expression'][0];
    // echo "<pre>";
    // $expOne = json_encode($expOne,JSON_PRETTY_PRINT);
    // echo $expOne;
    // echo "</pre>";
    // $expOne = json_decode($expOne,TRUE);
    // $expOne = exp_tree_string_from_exp_tree_array($expOne);
    // echo $expOne."<br>";







    ?>

    <?php
    // (2/3)*(4/5)*25



    ?>
    <form class="" action="./post_end_point.php" method="post">
      <textarea name="name" rows="8" cols="80">
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
      </textarea>
      <input type="submit" name="" value="1">
    </form>

  </body>
</html>
<?php
?>
