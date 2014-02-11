<h1> Assignment </h1>

Create a Google search page in <b>HTML5</b> (JavaScript, CSS3 and HTML), according to the given design.
You’ve to use RequireJS in your solution and you’re not allowed to use any other framework. You’re also
not allowed to use any back-end technology (for example: PHP, Node, etc…). You can use the old
Google search API (https://developers.google.com/web-search/docs/), but you’re not allowed to use
the Google search JavaScript library. You can’t ask any questions about the design, so use your intuition
to come up with a proper solution if something is not 100% clear.
We’ll test your page on Chrome version 31.x and support for more browsers is a plus but not required.
We’ll check your solution on the following criteria:
<ul>
  <li>  RequireJS usage </li>
  <li>  HTML5 Semantic elements usage </li>
  <li>  CSS3 usage </li>
  <li>  Code readability and maintainability </li>
  <li>  Error handling </li>
</ul>

<h2> Design </h2>
A simple Google search page, that shows both the image results of your search query as well as the normal Google search results.

// The exact description of the problem can be seen under the docs folder

<h2> Be aware of the Same Origin policy </h2>

There is two ways of solving this issue but I thought you were aware of it. You can either disable the security options in the browser, in my Mac I used the following command to run the browser from console disabling the security options:</br>
			
		/usr/bin/open -a "/Applications/Google Chrome.app" --args --disable-web-security
</br>

Or either you can create a reverse proxy in your server, activating the proxy packages in apache I did it like this in my proxy because I had the same problem some time ago using some API so I had to fix that before. You will have to uncomment the mod_proxy modules and then add the following lines to your httpd.conf file:

	<IfModule mod_proxy.c>

	ProxyRequests Off

	SSLProxyEngine on

	ProxyPass /googlesearch http://ajax.googleapis.com/ajax/services/search
	ProxyPassReverse /googlesearch http://ajax.googleapis.com/ajax/services/search

	</IfModule>

You can then perform the queries using something like, "http://localhost/googlesearch/web/xxxx" and "http://localhost/googlesearch/images/xxxx" where xxxx are the parameters you want to pass in your request.
