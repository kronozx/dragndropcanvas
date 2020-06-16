#Drag and Drop on Canvas

##Description   

git remote add origin https://github.com/kronozx/dragndropcanvas.git
Items can be added to canvas by clicking on them.
There is a remove area on the lower right corner of canvas to delete items.
When dropped, items will stay on top of the others. 

##Further Functionality
Display and Download Buttons can convert the canvas in a single image or download it 
as a .png file.
Keep in mind that display and download Buttons will give following error "Tainted canvases may not be exported."
This error disappeared when serving the project from a localhost server, serving the images from cloudinary and setting crossorigin='anonymous' on the images elements in the HTML.

When trying to implement additional features on the items drawn on the canvas, like rotation, it is suggested to use Canvas libraries like fabric.js or konva.js. 