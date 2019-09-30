<?php
include("login_details.php");
function query(){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }




  $sql = "SELECT id, tree, result FROM expressions;";
  $SQLresult = $conn->query($sql);
  $SQLresult = mysqli_fetch_all($SQLresult,MYSQLI_ASSOC);

  $result = $SQLresult;


  $conn->close();


  return $result;
}




function style($arg){
  ob_start();
  ?>
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      table, th, td {
        border: 1px solid black;
        padding: 5px;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <h1>API actions</h1>
    <ul>
      <li>
        <b>Add: </b> <a href="end_point_add_set.php">
          end_point_add_set.php
        </a>
      </li>
      <li>
        <b>Fetch: </b> <a href="end_point_fetch_set.php?page[offset]=0">
          end_point_fetch.php?page[offset]=0
        </a>
      </li>
    </ul>
    <h1>Normal actions</h1>
    <h2>Add</h2>
    <a href="action_add_set.php">Click</a>
    <h2>Fetch, Update and Remove</h2>
    <table>
      <tr>
        <th colspan="1">Expression</th>
        <th colspan="4">Actions</th>
      </tr>
      <tr>
        <th>id</th>
        <th>Fetch part</th>
        <th>Fetch set </th>
        <th>Update set </th>
        <th>Remove set</th>
      </tr>
      <?php if (!empty($arg)): ?>

        <?php foreach ($arg as $key => $value): ?>
          <tr>
            <td>
              <?php echo $value["id"]; ?>
            </td>

            <td>
              <a href="action_fetch_part.php?id=<?php echo $value["id"]; ?>">Click</a>
            </td>
            <td>
              <a href="action_fetch_set.php?id=<?php echo $value["id"]; ?>">Click</a>
            </td>

            <td>
              <a href="action_update_set.php?id=<?php echo $value["id"]; ?>">Click</a>
            </td>

            <td>
              <a href="end_point_remove_set.php?id=<?php echo $value["id"]; ?>">Click</a>
            </td>
          </tr>
        <?php endforeach; ?>


      <?php else: ?>
        <tr>
          <td colspan="5">
            No results...
          </td>
        </tr>
      <?php endif; ?>
    </table>

  </body>
  </html>

  <?php
  $result = ob_get_contents();
  ob_end_clean();
  return $result;
}

$query =query();
echo style($query);
?>
