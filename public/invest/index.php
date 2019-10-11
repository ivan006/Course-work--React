<?php

function query(){
  $terms = terms();

  $years=5;
  $months = $years*12;
  $timeInMonths = 0;

  $appreciationPerYear=0.07;
  $appreciationPerMonth=$appreciationPerYear/12;
  $initialInvestment=160;



  $result[$timeInMonths][$terms[4]]=0;
  $result[$timeInMonths][$terms[1]]=$initialInvestment;
  $result[$timeInMonths][$terms[3]]=round($result[$timeInMonths][$terms[1]]);
  $result[$timeInMonths][$terms[2]]=round($result[$timeInMonths][$terms[1]])-$initialInvestment;
  $result[$timeInMonths][$terms[0]]=$initialInvestment;
  $investment = $result[0][$terms[0]];

  while ($timeInMonths < $months) {
    $timeInMonths++;

    $result[$timeInMonths][$terms[4]]=round($timeInMonths/12,2);
    $result[$timeInMonths][$terms[1]]=$investment+($investment*($appreciationPerMonth));
    $result[$timeInMonths][$terms[3]]=round($result[$timeInMonths][$terms[1]]);
    $result[$timeInMonths][$terms[2]]=round($result[$timeInMonths][$terms[1]])-$initialInvestment;
    $result[$timeInMonths][$terms[0]]=$result[$timeInMonths][$terms[3]]-$result[$timeInMonths][$terms[2]];
    $investment = $result[$timeInMonths][$terms[0]];


  }
  return $result;
}


function terms(){
  $result = array(
    0 => "number of coins",
    2 => "income for month",
    3 => "equivilant (at initial value)",
    1 => "not rounded",
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
      <th class="bor-1 pad-3"><?php echo $terms[0] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[3] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[1] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[2] ?></th>
      <!-- <th class="bor-1 pad-3"><?php //echo $terms[1] ?></th> -->
    </tr>
  <?php foreach ($args as $key => $value): ?>
    <tr>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[4]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[0]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[3]] ?>
      </td>
      <td class="bor-1 pad-3">
        ~ <?php echo round($value[$terms[1]],2) ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[2]] ?>
      </td>
      <!-- <td class="bor-1 pad-3">
        <?php //echo $value[$terms[1]] ?>
      </td> -->
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
