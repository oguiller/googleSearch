define(["views/WebSearchView", "dtos/WebSearchResultDTO"], function(WebSearchView, WebSearchResultDTO) 
{
		var WebSearchController = function() 
		{
		return {
			
			webSearchRequest: null
			,cachedResults: null
			,resultsPerPage: 4
			,apiUrl: "https://ajax.googleapis.com/ajax/services/search/web"
			,webSearchView: new WebSearchView()

			,getWebSearchResults: function(str) {
				var me = this;
				me.cachedResults = new Array();

				if (str.length==0) { 
				  me.webSearchView.clearView();	
				  return;
		  		}
				if (window.XMLHttpRequest) {
				  webSearchRequest = new XMLHttpRequest();
				}
				else // for older IE 5/6
				{
				  webSearchRequest = new ActiveXObject("Microsoft.XMLHTTP");
				}
				try {
					me.webSearchView.clearView();
					var webSearchUrl = this.apiUrl + "?v=1.0&q="+ str +"&rsz=";
					webSearchRequest.open("GET", webSearchUrl + 8, false);

					webSearchRequest.onload = function (evtXHR) 
					{
		                if (webSearchRequest.status == 200)
		                {
		                	var response = JSON.parse(webSearchRequest.responseText);
							var webSearchResults = response.responseData.results;
							if (webSearchResults != null) 
							{
								webSearchResults.forEach( function(webResult) 
								{
									var webSearchResultDTO = new  WebSearchResultDTO();
									webSearchResultDTO.string = str;
									webSearchResultDTO.title = webResult.title;
									webSearchResultDTO.url = webResult.url;
									webSearchResultDTO.content = webResult.content;
									me.cachedResults.push(webSearchResultDTO);
								});
							}
		               	}
					}

					webSearchRequest.send();

					webSearchRequest.open("GET", webSearchUrl + 4 + "&start=8", false);
					webSearchRequest.send();

					me.showPage(1);			

				} catch (errr) {
					document.getElementById("web-results").innerHTML="Error: " + errr;
				}
			}

			,showPage: function (pageNumber) {
		    		this.webSearchView.clearView();
		    		
		    		var startIndex = (pageNumber - 1) * this.resultsPerPage;
		    		var endIndex = (pageNumber * this.resultsPerPage);

		    		var resultsForPage = this.cachedResults.slice(startIndex, endIndex);
		    		this.webSearchView.updateSearchValues(resultsForPage, this.cachedResults.length);	
		    }

		}
	}

	return webSearchController = new WebSearchController();


});