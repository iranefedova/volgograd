var AutoGlossary = {};
AutoGlossary = function() {
	this.minChars = 1;
	this.field = null;
	this.glossaryLoopId = 0;
	this.helper = null;
	this.helperContent = "";
}
AutoGlossary.prototype = {
	init:function(idOfTheField) {
		this.field = document.getElementById(idOfTheField);
		if(!this.field) {
			alert("Wrong input !");
		} else {
			this.createHelper();
			this.field.onfocus = this.onFieldIn;
			this.field.onblur = this.onFieldOut;
		}
	},
	onFieldIn:function() {
		AC.loop();
	},
	onFieldOut:function() {
		clearTimeout(AC.glossaryLoopId);
		setTimeout("AC.hideHelper()", 600);
	},
	loop:function() {
		var list = "";
		var value = AC.field.value;
		if(value.length >= this.minChars) {
			var numOfGlossaries = glossaries.length;
			for(var i=0; i<numOfGlossaries; i++) {
				if(value.toLowerCase() == glossaries[i].substr(0, value.length).toLowerCase()) {
					list += '<a href="javascript:AC.setGlossary(\'' + glossaries[i] + '\');">' + glossaries[i] + '</a>'
				}
			}
		}
		if(list != "") {
			if(this.helperContent != list) {
				this.helperContent = list;
				this.helper.innerHTML = this.helperContent;
			}
			this.showHelper();
		} else {
			this.hideHelper();
		}
		AC.glossaryLoopId = setTimeout("AC.loop()", 200);
	},
	setGlossary:function(glossary) {
		this.field.value = glossary;
		this.hideHelper();
	},
	// helper
	createHelper:function() {
		this.helper = document.createElement("div");
		this.helper.style.width = (this.field.offsetWidth - 22) + "px";
		this.helper.setAttribute("id", "helper");
		this.helper.innerHTML = "";
		document.body.appendChild(this.helper);
		this.positionHelper();
		this.hideHelper();
	},
	positionHelper:function() {
		var position = {x:0, y:0};
		var e = this.field;
		while(e) {
			position.x += e.offsetLeft;
			position.y += e.offsetTop;
			e = e.offsetParent;
		}
		this.helper.style.left = position.x + "px";
		this.helper.style.top = (position.y + this.field.offsetHeight)+ "px";
	},
	showHelper:function() {
		this.helper.style.display = "block";
	},
	hideHelper:function() {
		this.helper.style.display = "none";
	}
}

var AC = new AutoGlossary();

var glossaries = [
	// Africa
	"Администратор доходов бюджета",
	"Бюджет",
	"Бюджет государственного внебюджетного фонда",
];



