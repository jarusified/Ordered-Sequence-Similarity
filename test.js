var OSS = require('./OSS');

let table = [ [ { 'event' : 'a' }, { 'event' : 'b' }, { 'event' : 'c' }, { 'event' : 'd' } ],
	      [ { 'event' : 'a' }, { 'event' : 'b' }, { 'event' : 'c' }, { 'event' : 'a' } ]
	    ];
let language = [ 'a', 'b', 'c', 'd' ]

OSS(table, language);
