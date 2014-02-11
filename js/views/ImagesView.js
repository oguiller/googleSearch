define([], function() 
{	
	var ImagesView = function() {

		return {			
					updateImages: function(images) {
						if (images != null) {
							var imageResultsDiv = document.getElementById("images-results");

							images.forEach ( function(image) {
								imageResultsDiv.innerHTML += "<img class=\"image\" src="+ image.url +" width=\"125\" height=\"100\"/>";
							}) 
						} else {
							imageResultsDiv.innerHTML += "<p>No results were found!!</p>";
						}
					}

					,clearView: function () {
						document.getElementById("images-results").innerHTML = ""
					}
				}
	}

	return ImagesView;
});