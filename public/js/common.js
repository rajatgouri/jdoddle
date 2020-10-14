$(function () {
    function enableTab(id) {
        var el = document.getElementById(id);
        var totalCount = 1;


        el.onkeydown = function (e) {

            $('.divider').css('height', $('#part1').height() + 'px')
            $('#part2').css('height', $('#part1').height() + 'px')


            if (e.keyCode === 9) {

                var val = this.value,
                    start = this.selectionStart,
                    end = this.selectionEnd;

                this.value = val.substring(0, start) + '\t' + val.substring(end);

                this.selectionStart = this.selectionEnd = start + 1;

                return false;
            } 

            if  (e.keyCode === 13) {
                $('.numbers').text('')
                var lines = el.value.split("\n");  
                totalCount = lines.length;
                totalCount = totalCount + 1;
                
                if(totalCount > 25) {
                   let rows =  el.getAttribute('rows')
                   el.setAttribute('rows', parseInt(rows) + 1)
                }
                for(let i=0; i<totalCount ; i++) {
                    $('.numbers').append(i +1 + '<br>')
                }

            } 

            if  (e.keyCode === 8) {
                $('.numbers').text('')
                var lines = el.value.split("\n");  

                if(totalCount !== lines.length) {
                    if(totalCount > 1) {
                        totalCount = totalCount -1;

                        for(let i=0; i<totalCount ; i++) {
                            $('.numbers').append(i +1 + '<br>')
                        }    
                    } else {
                        $('.numbers').append( 1 + '<br>')

                    }
                } else {

                    for(let i=0; i<totalCount ; i++) {
                        $('.numbers').append(i +1 + '<br>')
                    }
                }
            } else {
                var lines = el.value.split("\n");  
                totalCount = lines.length;
                $('.numbers').text('')

                for(let i=0; i<totalCount ; i++) {
                    $('.numbers').append(i +1 + '<br>')
                }
            }
            
        };

        el.onkeyup = function (e) {
            if  (e.keyCode === 8) {
                $('.numbers').text('')
                var lines = el.value.split("\n");  

                if(totalCount !== lines.length) {
                    if(totalCount > 1) {
                        totalCount = totalCount -1;

                        for(let i=0; i<totalCount ; i++) {
                            $('.numbers').append(i +1 + '<br>')
                        }    
                    } else {
                        $('.numbers').append( 1 + '<br>')

                    }
                } else {

                    for(let i=0; i<totalCount ; i++) {
                        $('.numbers').append(i +1 + '<br>')
                    }
                }
            } else {
                var lines = el.value.split("\n");  
                totalCount = lines.length;
                $('.numbers').text('')

                for(let i=0; i<totalCount ; i++) {
                    $('.numbers').append(i +1 + '<br>')
                }
            }
        }
        
    }

    enableTab('yourcode')

    var p1 = parseInt($("#part1").width());
    var p2 = parseInt($("#part2").width());

    $(".divider").draggable({
        axis: "x",
        containment: "parent",
        scroll: false,
        drag: function () {
            var a = parseInt($(this).position().left);
            $("#part1").css({ width: a });
            $("#part2").css({ width: p1 + p2 - a });
        }
    });


    $('#yourcode').text('')
    $('#yourcode').focus()

});


function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runit() {
    var prog = document.getElementById("yourcode").value;
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });

    myPromise.then(function (mod) {
        console.log('success');
    },
        function (err) {
            console.log(err.toString());
            $('#output').text(err.toString())
        });
}

Sk.onAfterImport = function (library) {
    switch (library) {

        case 'turtle':
            // make turtle draw instantly
            Sk.tg.defaults.animate = false;
            Sk.tg.Turtle.prototype.speed = function () { }
            Sk.tg.Turtle.prototype.delay = function () { }
            break;
    }
}


function stopit() {
    var mypre = document.getElementById("output");
    mypre.innerHTML = 'You Have Stopped The Running Process';
    document.getElementById('mycanvas').innerHTML = '';
}

Sk.onAfterImport = function(library) {
    switch(library) {
      case 'pygal':
        // make charts render instantly
        Highcharts.setOptions({
          plotOptions: {
            series: {
              animation: false
            }
          }
        });
        break;
      case 'turtle':
        // make turtle draw instantly
        Sk.tg.defaults.animate = false;
        Sk.tg.Turtle.prototype.speed = function() {}
        Sk.tg.Turtle.prototype.delay = function() {}
        break;
    }
  }