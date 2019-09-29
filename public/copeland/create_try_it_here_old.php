<?php
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
</head>
<body>


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
  <form class="" action="./api_create.php" method="post">
    <input type="submit" name="" value="1">
  </form>
    <?php $_POST['text'] = 'another value'; ?>

</body>
</html>
