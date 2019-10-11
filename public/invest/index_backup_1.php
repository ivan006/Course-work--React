<?php

function query(){
  $years=2;
  $investment=160;
  $appreciationPerYear=0.07;
  $appreciationPerMonth=$appreciationPerYear/12;
  $months = $years*12;
  $income = 0;



  for ($timeInMonths=0; $timeInMonths < $months; $timeInMonths++) {
    $timeInYears = $timeInMonths/12;
    $terms = terms();
    $result[$timeInMonths][$terms[0]]=$investment;
    $result[$timeInMonths][$terms[1]]=$investment;
    $result[$timeInMonths][$terms[2]]=$income;
    $result[$timeInMonths][$terms[3]]=$income;
    $result[$timeInMonths][$terms[4]]=round($timeInYears,2);

    $income = round($investment*($appreciationPerMonth),2);
    $investment = $investment-$income;
  }
  return $result;
}

function terms(){
  $result = array(
    0 => "investment_in_gold_coin",
    1 => "investment_in_currency",
    2 => "appreciation_in_gold_coin",
    3 => "appreciation_in_currency",
    4 => "time",
  );
  return $result;
}


function style($args){
  ob_start();
  ?>




  <style media="screen">
    .bor-1 {border: solid 1px black;}
    .pad-3 {padding: 3px;}
  </style>
  <table>
    <tr>
      <?php $terms = terms(); ?>
      <th class="bor-1 pad-3"><?php echo $terms[4] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[2] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[3] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[0] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[1] ?></th>
    </tr>
  <?php foreach ($args as $key => $value): ?>
    <tr>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[4]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[2]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[3]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[0]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[1]] ?>
      </td>
    </tr>
  <?php endforeach; ?>
</table>
  <?php
  $result = ob_get_contents();
  ob_flush();
};
$query = query();
$result = style($query);
echo $result;
?>
