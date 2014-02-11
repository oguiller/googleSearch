define(["views/ImagesView", "dtos/ImageDTO"], function(ImagesView, ImageDTO) 
{
		var ImageController = function() 
		{
		return {
			
			imageSearchRequest: new XMLHttpRequest()
			,apiUrl: "https://ajax.googleapis.com/ajax/services/search/images"
			,imagesView: new ImagesView()

			,getImages: function (str) 
			{
				var me = this;

				if (str.length ==0) 
				{ 
				  me.imagesView.clearView();
				  return;
		  		}
				if (window.XMLHttpRequest) 
				{
				  imageSearchRequest = new XMLHttpRequest();
				}
				else // for older IE 5/6
				{
				  imageSearchRequest = new ActiveXObject("Microsoft.XMLHTTP");
				}
				try 
				{
					
					var imageSearchUrl = null;
					this.imagesView.clearView();

					imageSearchUrl = this.apiUrl + "?v=1.0&q="+str+"&rsz=8"; 
					imageSearchRequest.open("GET", imageSearchUrl, false);
					
					imageSearchRequest.onload = function (evtXHR) {
		           
			            if (imageSearchRequest.status == 200) {
			                var response = JSON.parse(imageSearchRequest.responseText);
							var results = response.responseData.results;
							var images = new Array();
							results.forEach ( function(imageResult) {
								var image = new ImageDTO();
								image.url = imageResult.url;
								images.push(image);
							});

							me.imagesView.updateImages(images);
			            } else {
			                alert("Invocation Errors Occured"); // We have to manage the errors in a better way.
			            }
		        	};
					imageSearchRequest.send();

					imageSearchUrl = this.apiUrl + "?v=1.0&q="+str+"&rsz=4&start=8";
					imageSearchRequest.open("GET", imageSearchUrl, false);
					imageSearchRequest.send();

				} catch (errr) {
					document.getElementById("images-results").innerHTML = "Error: " + errr;
				}
			}

		}
	}

	return ImageController;


});