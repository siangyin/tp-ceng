<html>

<body>
  <?php
    $htmlDisplay="<h1> Search Results: </h1>";
    $htmlDisplay=  $htmlDisplay. "<table border='1'>";
 
    if (isset($_POST["pid"])) {
          $pid = $_POST['pid'];
 
           require_once __DIR__ . '/db_connect.php'; // include db connect class
           $db= new DB_CONNECT();// connecting to db
           $db->connect();

           $sqlCommand="SELECT * FROM products WHERE pid = $pid";// get the search product from products table
           $result =mysqli_query($db->myconn, "$sqlCommand");
          $htmlDisplay = $htmlDisplay ."<th> Pid </th><th> Name </th> <th> Price </th> <th> Description </th>";// printing table headers

    if (mysqli_num_rows($result) > 0) {   // check for empty result
    // looping through all results

      foreach($result as $row)
      {   
          $htmlDisplay = $htmlDisplay ."<tr> <td>".$row["pid"]. "</td>";  
          $htmlDisplay = $htmlDisplay ."<td>".$row["name"]. "</td>";
          $htmlDisplay = $htmlDisplay ."<td>".$row["price"]. "</td>";  
          $htmlDisplay = $htmlDisplay ."<td>".$row["description"]. "</td></tr>";
      }
  
      $htmlDisplay =$htmlDisplay."</table>";
      echo $htmlDisplay;
  
    } else {// no products found
             echo "<h1> Not found </h1>";  
    }
        $db->close($db->myconn);
   }
?>



</body>

</html>