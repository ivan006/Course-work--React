<?php



include("login_details.php");

function query($arg){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }



  $sql = "DELETE FROM expressions WHERE id IN (?,?);";
  $query = $conn->prepare($sql);
  $query->bind_param("ss", $arg["id_1"],$arg["id_2"]);
  $query->execute();


  $conn->close();


}
function style(){
  ob_start();
  ?>
  <script type="text/javascript">
    window.location.href = './';
  </script>
  <?php
  $result = ob_get_contents();
  ob_end_clean();
  return $result;
}

if (isset($_GET["id"])) {
  $id = $_GET["id"];
  if ($id % 2 == 0) {
    $id_1 = $id;
    $id_2 = $id-1;
  } else{
    $id_1 = $id;
    $id_2 = $id+1;

  }

  query(array(
    'id_1'=>$id_1,
    'id_2'=>$id_2,
  ));
  echo style();

}

?>
