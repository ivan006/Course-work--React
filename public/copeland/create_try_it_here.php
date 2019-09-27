<?php
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>


  <form class="" action="./create_end_point.php" method="post">
    <textarea name="expressions" rows="8" cols="80">
      <?xml version="1.0" encoding="UTF-8"?>
      <expressions>
        <expression>
          <add>
            <number>1</number>
            <multiply>
              <number>2</number>
              <number>8</number>
            </multiply>
          </add>
        </expression>
        <expression>
          <minus>
            <divide>
              <number>1</number>
              <number>2</number>
            </divide>
            <number>8</number>
          </minus>
        </expression>
      </expressions>
    </textarea>
    <input type="submit" name="" value="1">
  </form>

</body>
</html>
