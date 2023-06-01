<!DOCTYPE html>
<h2>Add Product Here</h2>
<html>

<body>
  <form action="add_product_details.php" method="post">
    Product Name: <input type="text" name="name" size=50 value="<?php echo $name ?>"> <br> <br>
    Product Price: <input type="text" name="price" size=20 value="<?php echo $price ?>"> <br> <br>
    Product Description: <input type="text" name="description" size=50 value="<?php echo $description ?>"> <br> <br>
    <input type="submit" value="Add">
  </form>
  <br>
  <a href="get_all_products.php">List All Products</a>
</body>

</html>