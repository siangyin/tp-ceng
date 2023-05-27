package com.example.myfirstintent;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

public class MainActivity extends AppCompatActivity {

    Button buttonSend;
    Button buttonListView;
    EditText editTextMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        buttonSend=findViewById(R.id.bSend);
        editTextMessage=findViewById(R.id.ptMessage);
        buttonListView=findViewById(R.id.bListView);

        buttonSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this,SecondActivity.class);
                //get the entered text from EditText
                String msg = editTextMessage.getText().toString();


                //pass the msg using the name-value pair
                i.putExtra("Message",msg);
                startActivity(i);
            }
        });

        buttonListView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, ListViewActivity.class);
                startActivity(i);
            }
        });
    }
}