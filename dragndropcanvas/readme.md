#Drag and Drop on Canvas

##Description   

git remote add origin https://github.com/kronozx/dragndropcanvas.git
- Items can be added to canvas by clicking on them.
- There is a remove area on the lower right corner of canvas to delete items. Once on canvas, drag the item and drop it inside the red square area to delete it.
- When dropped, items will stay on top of the others. 

SEE A DEPLOYED DEMO at https://draganddropcanvas.netlify.app/

##Further Functionality
Download Button allows you to download canvas 
as a .png file.
Keep in mind that display and download Buttons will give following error "Tainted canvases may not be exported."
This error disappeared when serving the project from a localhost server, serving the images from cloudinary and setting crossorigin='anonymous' on the images elements in the HTML.

When trying to implement additional features on the items drawn on the canvas, like rotation, it is suggested to use Canvas libraries like fabric.js or konva.js. 
