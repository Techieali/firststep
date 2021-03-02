# TensorFlow Lite Apk build from Colab

### Overview

This is a basic camera application building pipeline project that continuously detects the objects (bounding boxes and
classes) in the frames seen by your device's back camera, using any tf lite object detection model which is given from the colab script.

These instructions walk you through building and running the demo on an Android device.

To run this program in colab (programming language - python)

1) Open the google colab and upload the provided jupyter notebook 

2) If the jupyter notebook stored in the drive, run from the drive 

To download files in python.
!pip install wget

The function in the colab script “file_download”  used to download and save.

In the main session have the area to enter the required variable for build apk.

Then send the variable to the server with the post API method.

Then check the status of the apk building with the get api method. If the status updates and requests for the apk URL to download files.
 
After getting the URL, the script will download and save the apk file to the colab

#server side 

##server system dependencies
Gradle
Android sdk 
Node 


We are running a node server script to communicate with the colab and trigger the events in the system

The API is running on the node. It has 3 endpoints.

1) start 
The start endpoint is the post method, it receives both URLs, MODEL_INPUT_SIZE, IS_MODEL_QUANTIZED from the colab. And change the values in the config.txt file. 
2) Then start the apk building through executing a bash script from node server, also set the status to the building. After completed apk building reset the status to completed

3) status 
The status endpoint is the get method, it retrains the mode status of model building 

4) getLink
The status endpoint is the get method, retrains the apk URL to download in colab



The model files are downloaded via Gradle scripts when you build and run. You
don't need to do any steps to download TFLite models into the project
explicitly.

gradle file will read the config file and and download the TFlite model and Label file on each request 



