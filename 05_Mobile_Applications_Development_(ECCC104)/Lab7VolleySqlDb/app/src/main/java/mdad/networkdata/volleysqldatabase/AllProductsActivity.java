package mdad.networkdata.volleysqldatabase;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class AllProductsActivity extends AppCompatActivity {

    //variable to store ListView
    ListView lv;
    //ArrayList to store product list from database
    ArrayList < HashMap < String, String >> productsList;
    // url to get all products list via the php file get_all_productsJson.php
    private static String url_all_products = MainActivity.ipBaseAddress + "/get_all_productsJson.php";
    // products JSONArray to store decoded JSON Array
    JSONArray products = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_all_products);

        // ArrayList to store product info in Hashmap for ListView
        productsList = new ArrayList < HashMap < String, String >> ();
        // re-usable method to use Volley to retrieve products from database
        postData(url_all_products, null);
        // get resource id of ListView
        lv = (ListView) findViewById(R.id.list);
    } // onCreate end here

    // post method
    public void postData(String url, final JSONObject json) {
        //create a RequestQueue for Volley
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        //define JSONObject Request for http post web request
        JsonObjectRequest json_obj_req = new JsonObjectRequest(
                Request.Method.POST, url, json, new Response.Listener < JSONObject > () {
            @Override
            //response from web request
            public void onResponse(JSONObject response) {
                //method to process the response results in JSONObject from web request
                checkResponse(response);
            }
        }, new Response.ErrorListener() {
            @Override
            //for any volley network error
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), "Error in Volley", Toast.LENGTH_LONG).show();
            }
        });
        //execute the JSONObject Request defined above
        requestQueue.add(json_obj_req);
    } // postData end here


    // check response method
    private void checkResponse(JSONObject response) {
        try {
            //check the response JSONObject has success == 1
            if (response.getInt("success") == 1) {
                // Get the Array of Products from the received JSONObject
                products = response.getJSONArray("products");
                // looping through All Products in the array
                for (int i = 0; i < products.length(); i++) {
                    //get the JSONObject of each product from the array
                    JSONObject c = products.getJSONObject(i);
                    // Storing each product info in variable
                    String id = c.getString("pid");
                    String name = c.getString("name");
                    String price = c.getString("price");
                    // creating new HashMap
                    HashMap < String, String > map = new HashMap < String, String > ();
                    // adding each product info to HashMap key => value
                    map.put("product_id", id);
                    map.put("product_name", name);
                    map.put("product_price", "$"+ price);
                    // adding map HashList to ArrayList
                    productsList.add(map);
                }
                /**
                 * Updating parsed JSON data into ListView by using SimpleAdapter, which links the data
                 to the ListView
                 * */
                ListAdapter adapter = new SimpleAdapter(
                        AllProductsActivity.this, productsList,
                        R.layout.list_item, new String[] {
                        "product_id",
                        "product_name",
                        "product_price"
                },
                        new int[] {
                                R.id.pid, R.id.name,R.id.price
                        });
                // updating listview
                lv.setAdapter(adapter);
            } else {}
        } catch (JSONException e) {
            Toast.makeText(getApplicationContext(), "Error in JSON", Toast.LENGTH_LONG).show();
        }
    }
    // check response end here

} // AllProductsActivity end here