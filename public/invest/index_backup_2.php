<?php

function query($arg){
  $terms = terms();

  $years=$arg[0];
  $months = $years*12;

  $IncPerYear=0.07;
  $IncPerMonth=$IncPerYear/12;

  $initialInvestment=$arg[1];

  $timeXInMonths = 0;

  $currentInvetment = $arg[1];
  $increase = 0;

  $cummulativePercIncrease = 0;



  while ($timeXInMonths < $months) {

    $result[$timeXInMonths][$terms[4]] = round($timeXInMonths/12,2);

    $result[$timeXInMonths][$terms[3]] = $currentInvetment+($currentInvetment*$cummulativePercIncrease);
    $result[$timeXInMonths][$terms[2]] = $increase;
    $result[$timeXInMonths][$terms[0]] = $currentInvetment-$increase;
    $result[$timeXInMonths][$terms[5]] = $cummulativePercIncrease;

    $cummulativePercIncrease = $cummulativePercIncrease+$IncPerMonth;
    $increase = $currentInvetment*$IncPerMonth;
    $currentInvetment = $result[$timeXInMonths][$terms[0]];
    $timeXInMonths++;

  }
  return $result;
}


function terms(){
  $result = array(
    0 => "number of coins",
    2 => "income for month",
    3 => "equivilant (at initial value)",
    4 => "time",
    5 => "cummulative Perc Increase",
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
      <th class="bor-1 pad-3"><?php echo $terms[3] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[2] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[0] ?></th>
      <th class="bor-1 pad-3"><?php echo $terms[5] ?></th>
      <!-- <th class="bor-1 pad-3"><?php //echo $terms[1] ?></th> -->
    </tr>
  <?php foreach ($args as $key => $value): ?>
    <tr>
      <td class="bor-1 pad-3">
        <?php echo $value[$terms[4]] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo round($value[$terms[3]]) ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo round($value[$terms[2]]) ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo round($value[$terms[0]]) ?>
      </td>
      <td class="bor-1 pad-3">
        ~<?php echo round($value[$terms[5]],2) ?>
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


$query = query(array(5,160));
$result = style($query);
echo $result;
?>
