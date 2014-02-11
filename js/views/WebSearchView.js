define([], function() 
{	
	var WebSearchView = function() 
	{

		return {

					updateSearchValues: function (searchValues, totalResults) 
					{
						
						if (searchValues != null) {
							var webSearchResultsDiv = document.getElementById("web-results");

							searchValues.forEach ( function(webSearchResult) {
								webSearchResultsDiv.innerHTML += "<div class=\"web_entry\">"
											  	+ "<b>" + webSearchResult.string + "</b><br/>" 
												+ "<a href="+ webSearchResult.url +">"+ webSearchResult.url + "</a><br/>"
												+ webSearchResult.content + "<br/>"	
												+ "<br/></div>";
								})

							webSearchResultsDiv.innerHTML += "<div id=\"paginator\">" + this.createPaginator(totalResults) +"</div>" ; 
						}
					}

					,createPaginator: function (totalResults) 
					{
						var paginator = null;
						
						if (totalResults > 4 && totalResults <= 8) {
							return this.getPaginator(2);
						} else if (totalResults > 8) {
							return this.getPaginator(3);
						}
					}

					,getPaginator: function(numPages) 
					{
						var pageIndex = "<a onclick=\"Methods.showPage(?)\" href=\"javascript:void(0)\">?</a> | ";
						var paginator = "";
						
						for ( var i=1; i <= numPages ; i++ ) {
							paginator += pageIndex;
							paginator = paginator.replace(/\?/g, i);
						}

						return paginator.substring(0, paginator.length - 2);
					}


					,clearView: function () {
							document.getElementById("web-results").innerHTML = "";
					}
				}
	}

	return WebSearchView;
});