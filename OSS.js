/* Ordering based Sequence Similarity - A Similarity Measure for Sequences of Categorical Data Based on the Ordering of Common Elements 
   
   Paper : https://link.springer.com/chapter/10.1007/978-3-540-88269-5_13

*/

function cardinality(seq){
    return seq.length;
}

function calculateEventFreq(seq, lang){
    let freq = {};
    for(let i = 0; i < lang.length; i++){
	freq[lang[i]] = 0;
    }
    for(let i = 0; i < seq.length; i++){
	freq[seq[i].event] += 1;
    }
    return freq;
}

function calculatePositionVector(seq, event){
    var ret = [];
    for(var i = 0; i < seq.length; i++){
	if(seq[i].event == event){
	    ret.push(i);
	}
    }
    return ret;
}

function f(seq1, seq2, lang){
    let eventFreqSeq1 = calculateEventFreq(seq1, lang);
    let eventFreqSeq2 = calculateEventFreq(seq2, lang);
    let max = Math.max(cardinality(seq1), cardinality(seq2));
    let sum = 0;
    for(var i = 0; i < lang.length; i++){
	let posVecSeq1 = calculatePositionVector(seq1, lang[i]);
	let posVecSeq2 = calculatePositionVector(seq2, lang[i]);
	delta = Math.min(cardinality(posVecSeq1), cardinality(posVecSeq2));
	for(var p = 0; p < delta; p += 1){
	    sum += Math.abs(posVecSeq1[p] - posVecSeq2[p]);
	}
    }
    return sum/max;
}


function g(seq1, seq2){
    let gseq1 = 0;
    for(let i = 0; i < seq1.length; i++){
	let elem = seq1[i];
	for(let j = 0; j < seq2.length; j++){
	    if(seq1[i].event == seq2[j].event){
		break;
	    }
	    if(j == seq2.length - 1){
		gseq1 += 1;
	    }
	}
    }
    
    let gseq2 = 0;
    for(let i = 0; i < seq2.length; i++){
	for(let j = 0; j < seq1.length; j++){
	    if(seq1[j].event == seq2[i].event){
		break;
	    }
	    if(j == seq1.length - 1){
		gseq2 += 1;
	    }
	}
    }

    return gseq1 + gseq2;
}

function calculateDissimilarity(seq1, seq2, language){
    let cardSeq1 = cardinality(seq1);
    let cardSeq2 = cardinality(seq2);
    let gValue = g(seq1, seq2);
    let fValue = f(seq1, seq2, language);
    return (fValue + gValue)/(cardSeq1 + cardSeq2);
}


/* Table : [ [ 
               { event: 'event1' }, 
	       { event: 'event2' },
	     ],
	     [ 
	       { event: 'event3' }, 
	       { event: 'event4' },
	     ]
	  ]
   Language : [ 'event1', 'event2', 'event3', 'event4' ] 
*/
function init(table, language){
    let dissimilarity = [];
    for(var i = 0; i < table.length; i++){
	if(dissimilarity[i] == undefined)
	    dissimilarity[i] = [];
	for(var j = 0; j < table.length; j++){
	    dissimilarity[i][j] = calculateDissimilarity(table[i], table[j], language);
	}
    }    
    return dissimilarity;
}

module.exports = init
