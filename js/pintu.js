
var Globe = {};
(function () {
	var imgPos = ['0px 0px','-230px 0px','-460px 0px','0px -230px','-230px -230px','-460px -230px','0px -460px','-230px -460px','-460px -460px'];
	var whiteSide = ['13','024','15','046','1357','248','37','468','57'];
	var indexArr = [];
	var whitePos;
	var s = 0;
	var sID;
	function checkAble(Arr){
	    var count = 0;
	    var m = 0;
	    var n = 0;
	    for(var i=0; i<Arr.length; i++){
	        if(Arr[i] == 0){
	            m = parseInt(i/3);
	            n = parseInt(i%3);
	        }
	        for(var j=i+1; j<Arr.length; j++){
	            if(Arr[j]<Arr[i]){
	                count++;
	            }
	        }
	    }
	    count += (m+n);
	    return count%2==0;
	}
	function indexInit() {
		indexArr = [];
		while(1) {
			if(indexArr.length===9) {
				if(checkAble(indexArr)) {
					break;
				} else {
					indexArr = [];
				}
			} else  {
				var random = Math.floor(Math.random()*10);
				if(indexArr.indexOf(random) === -1 && random !== 9) {
					indexArr.push(random);
				} 
			}
		}
		whitePos = indexArr.indexOf(0);
	}
	function arrangeIndexArr(n) {//n is WHITE's old position NO.
		var temp = indexArr[n];
		indexArr[n] = 0;
		indexArr[whitePos] = temp;
		whitePos = n;
	}
	function judgeIndexArr() {
		var nCount = 0;
		for(var i=0;i<indexArr.length;i++) {
			if(indexArr[i] === i) {
				nCount++;
			}
		}
		if(nCount === 9) {
			alert('Congratulations! You complete in '+s+' seconds!');
			unbindClick();
			sClockStop();
		}
	}
	function unbindClick() {
		for(var i=0;i<9;i++) {
			$('#pos_'+i).unbind('click');
		}
	}
	function reBindClick() {
		unbindClick();
		for(i=0;i<whiteSide[whitePos].length;i++) {
			$('#pos_'+whiteSide[whitePos].slice(i,i+1)).click(function() {
				var sidePos = $('#pos_'+$(this)[0].id.slice(-1)).css('background-position');
				var beClickedPos = $(this)[0].id.slice(-1)*1;
				$('#pos_'+whitePos).css('background-position',sidePos);
				$('#pos_'+beClickedPos).css('background-position','0px 0px');
				arrangeIndexArr(beClickedPos);
				judgeIndexArr();
				reBindClick();
			});
		}
	}
	function sClockStart() {
		sID = setInterval(function() {
			s++;
			$('#time').text(s);
		},1000);
	}
	function sClockStop() {
		clearInterval(sID);
		s = 0;
		$('#time').text(s);
	}
	function gameStart() {
		//data initial
		indexInit();
		//bind click function
		for(var i=0;i<whiteSide[whitePos].length;i++) {
			$('#pos_'+whiteSide[whitePos].slice(i,i+1)).unbind('click').click(function() {
				var sidePos = $('#pos_'+$(this)[0].id.slice(-1)).css('background-position');
				var beClickedPos = $(this)[0].id.slice(-1)*1;
				$('#pos_'+whitePos).css('background-position',sidePos);
				$('#pos_'+beClickedPos).css('background-position','0px 0px');
				arrangeIndexArr(beClickedPos);
				judgeIndexArr();
				reBindClick();
			});
		}
		//layout
		for(var i=0;i<9;i++) {
			$('#pos_'+i).css('background-position',imgPos[indexArr[i]]);
		}
	}
	Globe.tabGameClick = function() {
		$(this).attr('src','./img/play.png');
		sClockStop();
		$('#btn_play').click(function() {
			sClockStop();
			gameStart();
			sClockStart();
			$(this).attr('src','./img/replay.png');
		});
		//layout
		for(var i=0;i<9;i++) {
			$('#pos_'+i).css('background-position',imgPos[i]);
		}
	};
})();