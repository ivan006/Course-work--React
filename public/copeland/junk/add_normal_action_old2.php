
<!DOCTYPE html>
<html>
<body>

<h1>The XMLHttpRequest Object</h1>

<button type="button" onclick="loadDoc()">Request data</button>

<p id="demo"></p>
<p id="demo-r"></p>

<script>
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };

  xhttp.open("POST", "./api_create.php", true);
  xhttp.setRequestHeader("Content-type", "text/plain");
  xhttp.send("
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
      </expressions>");
}
</script>

</body>
</html>
