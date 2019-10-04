<?php
function get_middle ($str) {
  $len = strlen($str);
  if ($len % 2 == 0) {
    $subStringLenth = 2;
  } else {
    $subStringLenth = 1;
  }
  $subStringStart = round(($len/2)-1);
  $result = substr($str,$subStringStart,$subStringLenth);
  return $result;
}
echo get_middle ("hellohello");
?>
