# 1pt | Link shortener
In order to claim your shortened link, follow the steps below.

After you've forked the repo, add your shortened URL along with your long link in the ```REDIRECTS``` object in the file ```redirect.js```.

With the following example, [1pt.co/example]() will redirect to [https://www.example.com/]().
```js
var REDIRECTS = {
  'example': 'https://www.example.com/'
}
```

Commit the changes, then make a pull request titled "```short URL``` to ```long URL```".
The title for the example PR should look like the following:

**example to www.example.com**

You can expect your pull request being merged into the master branch within a couple days.
