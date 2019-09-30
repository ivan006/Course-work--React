<?php
//Check if a number is prime
function isPrime($num, $pf = null)
{
  if(!is_array($pf))
  {
    for($i=2;$i<intval(sqrt($num));$i++) {
      if($num % $i==0) {
        return false;
      }
    }
    return true;
  } else {
    $pfCount = count($pf);
    for($i=0;$i<$pfCount;$i++) {
      if($num % $pf[$i] == 0) {
        return false;
      }
    }
    return true;
  }
}

//Find Prime Factors
function primeFactors($num)
{
  //Record the base
  $base = intval($num/2);
  $pf = array();
  $pn = null;
  for($i=2;$i <= $base;$i++) {
    if(isPrime($i, $pn)) {
      $pn[] = $i;
      while($num % $i == 0)
      {
        $pf[] = $i;
        $num = $num/$i;
      }
    }
  }
  return $pf;
}
function solution($number){
  $result = array (
    2 => array (),
    3 => array (),

  );
  for ($i=0; $i < $number; $i++) {
    $factors = primeFactors($i);
    $factor_types = array_unique($factors);
    sort($factor_types);

    // whiteListCombos
    $wlc1 = array (2);
    $wlc2 = array (2,3);
    $wlc3 = array (3);

    if (!empty($factors)) {
      if ($factor_types == $wlc1 OR $factor_types == $wlc2 OR $factor_types == $wlc3 ) {

        $result[$i]["factors"] = $factors;
        $sumOfFactors = 0;
        foreach ($factors as $key => $value) {
          $sumOfFactors = $sumOfFactors+$value;
        }
        $result[$i]["sumOfFactors"] = $sumOfFactors;
      }

    }
  }
  return $result;
}
$thing = solution(30);
$thing = json_encode($thing, JSON_PRETTY_PRINT);
echo "<pre>";
echo $thing;
?>
