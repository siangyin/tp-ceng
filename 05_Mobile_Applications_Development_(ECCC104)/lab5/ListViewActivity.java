package com.example.myfirstintent;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;

public class ListViewActivity extends AppCompatActivity {
ListView listView;

int[] recId={1,2,3,4,5};
String[] name={"Johnny","William","Susan","Peter","Carol"};
String[] email={"Johnny@gmail.com","William@gmail.com","Susan@gmail.com","Peter@gmail.com","Carol@gmail.com"};
String[] tel={"12345678","87654321","11111111","22222222","33333333"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view);

        //#2 Bind java and xml
        listView = findViewById(R.id.list);
        //arraylist to contain the hashmap of data to be displayed in each row of the ListView
        ArrayList<HashMap<String,String>>arrayList=new ArrayList<>();

        for(int i =0;i<recId.length;i++){
            //create a hashmap to store the data in key value pair
            HashMap<String,String>hashMap=new HashMap<>();
            hashMap.put("id",""+recId[i]);
            hashMap.put("name",""+name[i]);
            hashMap.put("tel",""+tel[i]);
            hashMap.put("email",""+email[i]);

            //add the hashmap into arrayList
            arrayList.add(hashMap);
        }




        String[] from = {"name","tel","email"};//string array
        int[] to = {R.id.tvName, R.id.tvTel,R.id.tvEmail};


        SimpleAdapter simpleAdapter = new SimpleAdapter(this,arrayList,R.layout.list_view_items,from,to);
        listView.setAdapter(simpleAdapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
// retrieve the 3 values of selected item from ArrayList based on the hashmap key
                String recId = arrayList.get(position).get("id");
                String name = arrayList.get(position).get("name");
                String tel = arrayList.get(position).get("tel");
                String email = arrayList.get(position).get("email");
// Show in Toast Alert
                Toast.makeText(getApplicationContext(), "Selected Item position: " + position + "\nrecid: "
                        + recId + " Name: " + name + " Tel: " + tel + " Email: "+ email, Toast.LENGTH_LONG).show();
            }
        });




    }
}