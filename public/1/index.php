<?php
function solution($number){
  $maxProduct = $number;
  $sum = 0;
  $i = 0;
  $possibleProduct = 0;
  while($i <= $maxProduct) {

    // $calc[$i]["product"] = $possibleProduct." (3^".$i."* 5^".$i.")";
    // $calc[$i]["sum"] = $sum." (3*".$i."+5*".$i.")";
    if (!function_exists("intergerFactoriseWith3And5")) {
      // code...
      function intergerFactoriseWith3And5($possibleProduct){
        if ($possibleProduct % 3 ==0) {
          $possibleProduct = $possibleProduct/3;
          $possibleProduct = intergerFactoriseWith3And5($possibleProduct);
        } elseif ($possibleProduct % 5 ==0) {
          $possibleProduct = $possibleProduct/5;
          $possibleProduct = intergerFactoriseWith3And5($possibleProduct);
        }
        return $possibleProduct;
      }
    }
    // $possibleProduct =
    // $possibleProduct = intergerFactoriseWith3And5($i);
    $possibleProduct = $i;
    $possibleProducts[$i] = $possibleProduct;


    $i++;

    // $possibleProduct = pow(3,$i)*pow(5,$i);
    // $sum = 3*$i+5*$i;
  }

  // $calc[$i]["sum"] = 5^$i;
  return $possibleProducts;
}

$thing = solution(10);
echo "<pre>";
var_dump($thing);
?>
