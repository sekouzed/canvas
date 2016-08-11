
var canvas ;
var canvas_json ;
jQuery(document).ready( function() {
    // create a wrapper around native canvas element (with id="c")
    canvas = new fabric.Canvas('c');
    canvas.hoverCursor = 'pointer';

    // canvas.setDimensions({
    //     width: $("#i").width(),
    //     height: $("#i").height()
    // });
    //
    // $("#i").css({top:   $("#c").top, left:   $("#c").left, position:'absolute'});

/*

    canvas.setBackgroundImage('level-up.png', canvas.renderAll.bind(canvas), {
        width: canvas.width,
        height: canvas.height,
        // Needed to position backgroundImage at 0/0
        originX: 'left',
        originY: 'top'
    });
 */
    
    var img_max_width=$("#wrap").width();

   fabric.Image.fromURL('bg.jpg', function(img) {
        //img.set({width: canvas.width, height: canvas.height, originX: 'left', originY: 'top'});

       if(img.width>img_max_width){


           r=img.width/img.height;

           height=img_max_width/r;

           img.set({width: img_max_width, height: height});
       }

        canvas.setDimensions({
            width: img.width,
            height: img.height
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    var to_del=null;
    canvas.on('mouse:down', function(options) {
        if (options.target) {
            //console.log('an object was clicked! ', options.target.type);
            //options.target.remove()
            $("#del").prop('disabled',false);
            to_del=options.target;
            options.target.set({
                borderColor: 'red',
                cornerSize: 10
            });
        }else {
            $("#del").prop('disabled',true);
            to_del=null;
        }
    });

    $("#add").click(function(){

        var t=$("#addtext").val();
        if(!t.length){
            alert('text requis');
            return false;
        }

        var fontSize=20, f=$("#fontSize").val();
        if(f.length){
            fontSize=parseInt(f);
        }
        
        var text = new fabric.Text(t, {
            left: 100,
            top: 100,
            //fontFamily: 'Comic Sans',
            fontSize: fontSize
        });
        /*text.on('selected', function() {
            console.log('selected a circle');
            if( $('#r').is(':checked') ){
                text.remove()
            }
        });*/
        text.hasControls=false;
        canvas.add(text);
    });
    $("#del").click(function(){
     /*   var activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (confirm('Are you sure?')) {
                canvas.remove(activeObject);
            }
        }
        else {
           alert('select item')
        }*/

        if(to_del!=null && confirm('Are you sure?')) {
            to_del.remove()
        }
        $("#del").prop('disabled',true);
        to_del=null;
    });
    $("#save").click(function(){
        //canvas_json=JSON.stringify(canvas);
        //canvas.loadFromJSON(canvas_json);
        //console.log(canvas_json);
        window.open(canvas.toDataURL('png'), '_blank');
        //console.log(canvas.toSVG());


        // only jpeg is supported by jsPDF
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF();

        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");

    });
});
/*this.Print = function () {
    var printCanvas = $('#c');
    printCanvas.attr("width", mainCanvas.width);
    printCanvas.attr("height", mainCanvas.height);
    var printCanvasContext = printCanvas.get(0).getContext('2d');
    window.print();
}*/