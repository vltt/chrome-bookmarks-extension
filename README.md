This extension allows:
 - save current page to storage
 - show all saved pages
 - delete saved pages
 
 ![alt text](https://github.com/vltt/chrome-bookmarks-extension/blob/main/extension-screenshot.png)
 
**Bug:** there is race condition between saving page and showing saved pages, so you need to press "Save this page" twice to see it in saved pages (if you pres once page will be saved, but will not show up immediately)

**TODO:** fix bug :)
