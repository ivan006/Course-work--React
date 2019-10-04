<?php

function solution($number){
  if ($number > 0) {
    $ID = 0;
    for ($value=0; $value < $number; $value++) {
      if ($value % 3 == 0 OR $value % 5 == 0) {
        $array[$ID] = $value;


        $ID++;
      }
    }
    $sum = array_sum($array);
    return $sum;
  }
}
echo solution(0);
?>
