<html>

<body>
  <?php
 // Following code will list all the products
$htmlDisplay="<h1> Search Results: </h1>";
$htmlDisplay=  $htmlDisplay. "<table border='1'>";
 
 // include db connect class
    require_once __DIR__ . '/db_connect.php';
 // connecting to db
    $db= new DB_CONNECT();
    $db->connect();


    //  $sqlCommand="SELECT * FROM staffdir";       Modify SQL statements
    $sqlCommand="SELECT * FROM products";// get all products from products table
    $result =mysqli_query($db->myconn, "$sqlCommand");

// printing table headers
$htmlDisplay = $htmlDisplay ."<th> Pid </th><th> Name </th> <th> Price </th> <th> Description </th>";

// check for empty result
if (mysqli_num_rows($result) > 0) {
    // looping through all results
     foreach($result as $row)
     {

      $dataHtml = nl2br($row["description"]);

       $htmlDisplay = $htmlDisplay ."<tr> <td>".$row["pid"]. "</td>";    
       $htmlDisplay = $htmlDisplay ."<td>".$row["name"]. "</td>";
       $htmlDisplay = $htmlDisplay ."<td>".$row["price"]. "</td>";  
       $htmlDisplay = $htmlDisplay ."<td>".$dataHtml. "</td></tr>";
                     
     }
 
     $htmlDisplay =$htmlDisplay."</table>";
     echo $htmlDisplay;
   } else {  // no products found
             echo "<h1> Not found </h1>";   }
$db->close($db->myconn);
?>
</body>

</html>