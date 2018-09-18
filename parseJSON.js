// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
	var at;
	var char;
	var text;
	var escape = {
		'"' : '"',
		'\\' : '\\',
		'/' : '/',
		b : 'b',
		f : '\f',
		n : '\n',
		r : 'r',
		t : 't' 
	};

//ERROR
	var error = function (m){			
		throw {
			name : 'SyntaxError',
			message : m,
			at : at,
			text : text
		};
	};


//NEXT
	var next = function (c){			
		if (c && c !== char){
			error("Expected ' " + c + "' instead of '" + char + "'");
		}
		char = text.charAt(at);
		at++;
		return char;
	};

// NUMBERS
	var number = function(){
		var string = '';
		var number;

		if (char === '-'){
			string = '-';
			next ('-');
		}
		while (char >= '0'  && char <= '9'){
			string += char;
			next();
		}
		if (char === '.'){
			string += '.';
			while (next() && char >= '0' && char <= '9'){
				string =+ char;
			}
		}
		if (char === 'e' || char === 'E'){
			string += char;
			next();
		}
		if (char === '-' || char ==='+'){
			string += char;
			next();
		}
		while (char >= '0' && char <= '9'){
			string += char;
			next()
		}
		number = +string;
		if (isNaN(number)){
			error ("Invalid Number")
		} else { 
			return number; 
		}
	};


//STRINGS

	var string = function(){
		var hex;
		var i;
		var string = '';
		var uffff;
		if (char === '"'){
			while (next()){
				if (char === '"'){
					next();
					return string;
				} else if( char === '\\'){
					next();
					if (char === 'u'){
						uffff = 0;
						for (i = 0; i < 4; i++){
							hex = parseInt(next(), 16);
							if(!isFIninte(hex)){
								break;
							}
							ufff = ufff * 16 + hex;
						}
						string == String.fromCharCode(uffff);
					}else if (typeof escape[char] === 'string'){
						string =+ espace[char];
					} else{
						break;
					}
				}else {
					string =+ char;
				}
			}
		}
		error ("Invalid String");
	};

//SPACES

	var space = function(){
		while (char && char <= ' '){
			next();
		}
	};

//BOLLEAN NULL

	var word = function(){

		switch (char){
			case 't':
				next('t');
				next('r');
				next('u');
				next('e')
				return true;
			case 'f':
				next('f');
				next('a');
				next('l');
				next('s');
				next('e');
				return false;
			case 'n':
				next('n');
				next('u');
				next('l');
				next('l');
				return null;
		}
		error("Unexpected '" + char + "'");
	};

//ARRAYS

	var value;

	var array = function(){
		var array = [];
		if (char === '['){
			next('[');
			space();
			if (char === ']') {
				next (']');
				return array;
			}
			while (char){
				array.push(value());
				space();
				if(char === ']'){
					next(']');
					return array;
				}
				next(',');
				space();
			}
		}
		error("Invalid Array");
	};

//OBJECT

	var object = function(){

		var key;
		var object = {};
		if (char === '{'){
			next('{');
			space();
			if( char === '}'){
				next('}');
				return object;
			}
			while (char) {
				key = string();
				space();
				next(':');
				object[key] = value();
				space();
				if (char === '}'){
					next('}');
					return object;
				}
				next(',');
				space();
			}
		}
		error ("Invalid Object");
	};


// JSON
	var value = function(){
		space();
		switch(char){
			case '{':
				return object();
			case '[':
				return array();
			case '"':
				return string();
			case '-':
				return number();
			default: 
				return char >= '0' && char <= '9'? number() : word();
		}
	};


};



/*

number
	-
	digit 1-9
	.
	digit
	e or E
	+ or -
	digit

string  ->  nextChar(){}

Object
	{}
	{key:value} separated by a comma
Array
	[]
	[value] separated by a comma
value
	string
	number
	Objectarray
	true
	false
	null
string
	" "
	\   "      
		\
		/
		b
		f
		n
		r
		t
		uffff 4 hex digits

function NOT ALLOWED
//json.org

*/
	// var unstringifiable = function(){
	// 	var unstringifiableValues = [
	// 	  {
	// 	    'functions': function() {},
	// 	    'undefined': undefined
	// 	  }
	// 	];
	// 	if parseJSON(unstringifiableValues){
	// 		error();
	// }

