<?php



include("login_details.php");

function query($arg){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }



  foreach ($arg as $key => $value) {
    // code...
    $sql = "UPDATE expressions SET result=?,tree=? WHERE id=?;";
    $query = $conn->prepare($sql);
    $thing= "thing";
    $query->bind_param("sss",$value["result"],$value["tree"],$value["id"] );
    $query->execute();
  }


  $conn->close();


}
function style($arg){
  ob_start();
  ?>
  <script type="text/javascript">
    window.location.href = './action_update_set.php?id=<?php echo $arg ?>';
  </script>
  <?php
  $result = ob_get_contents();
  ob_end_clean();
  return $result;
}

if (isset($_POST["data"])) {
  $data = $_POST["data"];

  $update_1_tree = $data[0]["tree"];
  eval("\$data[0]['result'] = $update_1_tree;");

  $update_2_tree = $data[1]["tree"];
  eval("\$data[1]['result'] = $update_2_tree;");
  echo "<pre>";
  // var_dump($data);
  query($data);
  // echo $data[0]["id"];
  echo style($data[0]["id"]);

}
?>
