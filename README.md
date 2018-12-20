# <img align="center" width="50" src="https://raw.githubusercontent.com/paramt/1pt/master/resources/favicon/android-chrome-512x512.png">  [Link shortener](https://www.1pt.co)

## Overview
1pt is currently a standard URL shortener, but soon it will be like no other URL shortener out there. Currently, users can input a long URL like ```https://www.param.me/projects``` and expect a shortened URL like ```www.1pt.co/5dy7``` that points to said long URL.

The goal for this project is to allow users to generate smart & dynamic links where links can point to different destinations based on factors like user agent or country. For example, a link like ```www.1pt.co/MyApp``` would point to the *Play Store* on all android devices, the *App Store* on all iPhones and iPads, and the app website on all desktop devices.

The vision is to create something like [IFTTT](https://ifttt.com/), where users can choose from a wide variety of factors that influence where a link will point to.

## API
The endpoint at ```http://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/add-url-to-db.php?url=``` is free to use. Just append your long URL to the end of the link, and the PHP will spit out a short 4-letter string. ```www.1pt.co/[4-letter-code]``` will redirect to the original URL.

## Feature Requests
Feel free to [suggest a feature or idea](https://github.com/paramt/1pt/issues/new), but just remember to add the ```enhancement``` label to it.

-----
###### This project was initiated by Param Thakkar as a school project
