# <img align="center" width="50" src="https://raw.githubusercontent.com/paramt/1pt/master/resources/favicon/android-chrome-512x512.png">  [Link shortener](https://www.1pt.co)


**1pt** is a URL shortening service that allows users to create dynamic URL forwarders. Users can generate smart links that point to different destinations based on factors like user agent or country. For example, a link like ```www.1pt.co/MyApp``` could point to the *Play Store* on all android devices, the *App Store* on all iPhones and iPads, and the app website on all desktop devices.

## API
The endpoint at ```api.1pt.co/``` is free to use but does not support HTTPS. You can make a request using these `GET` variables

| `url`       | Required | The long URL to shorten                        |
| ----------: | :------: | ---------------------------------------------- |
| `custom`    | Optional | Request a custom short URL                     |
| `desktop`   | Optional | Specific redirect for all desktop devices      |
| `apple`     | Optional | Specific redirect for all iOS devices          |
| `android`   | Optional | Specific redirect for all Android devices      |
| `mobile`    | Optional | Redirect for mobile users if the OS is undetermined or is something other than Apple/Android) |

For example, a request to `http://api.1pt.co/?url=www.param.me` will return a random 4-letter string like `an5n`. In that case, `1pt.co/an5n` is your short URL that redirects to `www.param.me`. If you request a custom short URL and it doesn't return that URL, it's already taken. So `http://api.1pt.co/?url=www.param.me&custom=MyWebsite` will return `MyWebsite` if it's available, and a random 4-letter string if it isn't.

-----
###### This project is maintained by [Param Thakkar](https://www.param.me)
