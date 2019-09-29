<!DOCTYPE html>
<html>
<body>

<h1>The XMLHttpRequest Object</h1>

<textarea id="textarea" name="name" rows="8" cols="80">
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
<br>
<button type="button" onclick="loadDoc()">Request data</button>
<br>
<p id="demo"></p>

<script>
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "./create_end_point.php", true);
  xhttp.setRequestHeader("Content-type", "text/xml");
  var xml = document.getElementById("textarea").value;
  xhttp.send(xml);
}
</script>

</body>
</html>
