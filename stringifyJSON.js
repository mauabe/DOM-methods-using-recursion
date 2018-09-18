// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  

//check for number, boolean, null, function
//check for array
//check for object
	if(typeof obj === 'number'){
		return obj.toString();
	}
	else if (typeof obj === 'string'){
		return '"' + obj + '"';
	}
	else if(typeof obj === 'boolean'){
		return obj.toString();
	}
	else if (obj === null){
		return "null";
	}
	else if(obj === undefined || typeof obj === 'function'){
		return '{}';
	}
		//ARRAYS	
	else if(Array.isArray(obj)){
		if(obj.length === 0){
			return "[]";
		}
		else {
			var result = [];
			obj.forEach(function(elem){
				result.push(stringifyJSON(elem))
			});
			return "[" + result + "]";
		}
	}
		// OBJECTS
	else if(obj instanceof Object){
        var objKeys = Object.keys(obj);		//array of keys
        var result2 = [];					//empty array 
        objKeys.forEach(function(key) {
            var value = obj[key];			
            if (value instanceof Function || typeof value === undefined)
                result2.push('');
            else if (typeof value === 'string')
                result2.push('"'+ key + '":'+ stringifyJSON(value));

            else if (typeof value === 'boolean' || typeof value === 'number' || value === null)
                result2.push( '"'+ key +'":'+ stringifyJSON(value) );

            else if (value instanceof Object) {
                result2.push('"'+ key + '":' + stringifyJSON(value));
            }
        });
        return '{' + result2 + '}';
    }
};  // THIS IS IT!







/*

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
		u 4 hex digits

number
	-
	digit 1-9
	.
	digit
	e or E
	+ or -
	digit

function NOT ALLOWED
//json.org

*/

