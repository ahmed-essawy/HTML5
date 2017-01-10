var cont = document.getElementById("myCanv").getContext("2d"), boxes = new Array(), count = 0, dim = 600;
draw(5);
setInterval(function () {
	if (boxes.length <= 0) {
		alert('GREAT!, You click on all boxes in ' + count / 10 + ' Seconds');
		location.reload();
	} else {
		if (count / 10 >= 10) {
			alert('GAME OVER!, There are ' + boxes.length + ' boxes not clicked yet');
			location.reload();
		} else if (Number.isInteger(count / 10)) document.getElementById('counter').innerText = 10 - count / 10;
	}
	++count;
}, 100);
document.getElementById("myCanv").addEventListener('click', function (e) {
	if ((del = check_click(e.offsetX, e.offsetY)) != -1) {
		cont.clearRect(boxes[del].x, boxes[del].y, boxes[del].w, boxes[del].h);
		boxes.splice(del, 1);
	}
});
function check_click(x, y, i = 0) {
	var ret_val = -1;
	if (i < boxes.length) {
		if (x < boxes[i].x + boxes[i].w && y < boxes[i].y + boxes[i].h && x > boxes[i].x && y > boxes[i].y) ret_val = i;
		else ret_val = check_click(x, y, i + 1);
	}
	return ret_val;
}
function check_availability(obj, i = 0) {
	var ret_val = false;
	if (i < boxes.length) {
		if (obj.x > boxes[i].x + boxes[i].w || obj.y > boxes[i].y + boxes[i].h || obj.x + obj.w < boxes[i].x || obj.y + obj.h < boxes[i].y) ret_val = check_availability(obj, i + 1);
	} else ret_val = true;
	return ret_val;
}
function draw(n = 1) {
	var box = {};
	box.w = rand(50, dim), box.x = rand(0, dim - box.w);
	box.h = rand(50, dim), box.y = rand(0, dim - box.h);
	if (check_availability(box)) {
		boxes.push(box);
		cont.fillStyle = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
		cont.fillRect(box.x, box.y, box.w, box.h);
		if (n > 1) draw(n - 1);
	} else draw(n);
}
function rand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}