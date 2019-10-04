<?php


function markdown_parser ($markdown) {
  if (!function_exists("helper")) {
    function helper($hashes,$htmltag,$markdown){

      $result = $markdown;
      $patern = "/(.*?)".$hashes." (.*)/";

      preg_match_all($patern, $result, $matches, PREG_SET_ORDER);
      if (!empty($matches)) {
        $whitelist = array (
          " "
        );
        foreach ($matches as $key => $value) {
          $begining = str_split($value[1]);
          $begining = array_unique($begining);
          if ($value[1] == "" OR $begining ==  $whitelist) {
            $value[2] = ltrim($value[2]);
            $value[2] = rtrim($value[2]);
            $result = str_replace($value[0], "<".$htmltag.">".$value[2]."</".$htmltag.">", $result);
          }
        }
      }
      return $result;

    }
  }
  $result = $markdown;
  $result = helper("######","h6",$result);
  $result = helper("#####","h5",$result);
  $result = helper("####","h4",$result);
  $result = helper("###","h3",$result);
  $result = helper("##","h2",$result);
  $result = helper("#","h1",$result);


  return $result;

}

$thing = "

  # hi

w  # Big


##        hihi
###  hihihi
#### hihihihi
##### hihihihihi
###### hihihihihihi";
// echo "<pre>";

echo "<pre>";
echo markdown_parser ($thing);




?>
