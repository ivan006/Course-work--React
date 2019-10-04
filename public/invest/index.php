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

    $result[$timeInMonths]["investment_igc"]=$investment;
    $result[$timeInMonths]["investment_ic"]=$investment;
    $result[$timeInMonths]["appreciation_igc"]=$income;
    $result[$timeInMonths]["appreciation_ic"]=$income;
    $result[$timeInMonths]["time"]=round($timeInYears,2);

    $income = round($investment*($appreciationPerMonth),2);
    $investment = $investment-$income;
  }
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
      <th class="bor-1 pad-3">time</th>
      <th class="bor-1 pad-3">appreciation in gold coins</th>
      <th class="bor-1 pad-3">appreciation in cur.</th>
      <th class="bor-1 pad-3">investment in gold coins</th>
      <th class="bor-1 pad-3">investment in cur.</th>
    </tr>
  <?php foreach ($args as $key => $value): ?>
    <tr>
      <td class="bor-1 pad-3">
        <?php echo $value["time"] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value["appreciation_igc"] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value["appreciation_ic"] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value["investment_igc"] ?>
      </td>
      <td class="bor-1 pad-3">
        <?php echo $value["investment_ic"] ?>
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
