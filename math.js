// inputs
var pascalN = document.getElementById("pascalN");
var pascalK = document.getElementById("pascalK");
var pascalTriN = document.getElementById("pascalTriN");
var tNumberM = document.getElementById("tNumberM");
var tNumberN = document.getElementById("tNumberN");
var tNumberTriM = document.getElementById("tNumberTriM");
// buttons
var pascalCalculate = document.getElementById("pascalCalculate");
var pascalGenerate = document.getElementById("pascalGenerate");
var tNumberCalculate = document.getElementById("tNumberCalculate");
var tNumberGenerate = document.getElementById("tNumberGenerate");
// outputs
var pascalResult = document.getElementById("pascalResult");
var pascalTriangle = document.getElementById("pascalTriangle");
var tNumberResult = document.getElementById("tNumberResult");
var tNumberTriangle = document.getElementById("tNumberTriangle");

pascalCalculate.onclick=function() {
	var n = +pascalN.value;
	var k = +pascalK.value;
	var val = pascalCalculateFunc(n, k);
	//console.log(pascalN.value + " " + pascalK.value);
	console.log(val);

	pascalResult.innerHTML=val;
}

pascalGenerate.onclick=function() {
	var n = +pascalTriN.value;

	pascalGenerateFunc(n, pascalTriangle);
}

// n: row of solution
// k: column of solution
function pascalCalculateFunc(n, k) {
	var results = [];
	// construct solution array, where '-1' indicates and unsolved pascal result
	for (var i = 0; i <= n; ++i) {
		results[i] = [];
		for (var j = 0; j <= i; ++j) {
			results[i][j] = -1;
		}
	}

    //console.log(results);

	return pascalCalculateFuncRecursive(n, k, results);
}

// n: row of solution
// k: column of solution
// results: partially constructed solution array (for memoization)
function pascalCalculateFuncRecursive(n, k, results) {
	if (k == 0 || n == 0 || n == k) {
		return 1;
	}
	else if (k > n || k < 0 || n < 0) {
		return 0;
	}
	else {
		if(results[n - 1][k - 1] == -1) {
			results[n - 1][k - 1] = pascalCalculateFuncRecursive(n - 1, k - 1, results);
		}
		if(results[n - 1][k] == -1) {
			results[n - 1][k] = pascalCalculateFuncRecursive(n - 1, k, results);
		}
		return results[n - 1][k - 1] + results[n - 1][k];
	}
}

// n: rows of triangle
// loc: container for triangle (expect div)
function pascalGenerateFunc(n, loc) {
	loc.innerHTML = "";
	var results = [];
	// construct solution array while creating triangle
	for (var i = 0; i <= n; ++i) {
		results[i] = [];
		loc.innerHTML = loc.innerHTML + "<p>"
		for (var j = 0; j <= i; ++j) {
			if (j == 0 || j == i || i == 0) {
				results[i][j] = 1;
			}
			else {
				var leftPar = 0;
				var rightPar = 0;
				leftPar = results[i-1][j-1];
				rightPar = results[i-1][j];
				results[i][j] = leftPar + rightPar;
			}
			loc.innerHTML = loc.innerHTML + results[i][j] + " ";
		}
		loc.innerHTML = loc.innerHTML + "</p>"
	}
}

tNumberCalculate.onclick=function() {
    var m = +tNumberM.value;
    var n = +tNumberN.value;
    var val = tNumberCalculateFunc(m, n);

    tNumberResult.innerHTML=val;
}

tNumberGenerate.onclick=function() {
    var m = +tNumberTriM.value;
    tNumberGenerateFunc(m, tNumberTriangle);
}

// m: row of solution
// n: column of solution
function tNumberCalculateFunc(m, n) {
    var results = [];
    // construct solution array, where '-1' indicates and unsolved pascal result
    for (var i = 0; i < m; ++i) {
        results[i] = [];
        for (var j = 0; j <= i; ++j) {
            results[i][j] = -1;
        }
    }

    //console.log(results);

    var result = tNumberCalculateFuncRecursive(m-1, n-1, results);

    console.log(results);

    return result;
}

// n: row of solution - 1
// k: column of solution - 1
// results: partially constructed solution array (for memoization)
function tNumberCalculateFuncRecursive(m, n, results) {
    if (m == 0 || n == 0) {
        return 1;
    }
    else if (n < 0 || m < 0 || n > m) {
        return 0;
    }
    else {
        if (results[m - 1][n - 1] == -1) {
            results[m - 1][n - 1] = tNumberCalculateFuncRecursive(m - 1, n - 1, results);
        }
        if (results[m - 1][n] == -1) {
            results[m - 1][n] = tNumberCalculateFuncRecursive(m - 1, n, results);
        }

        var leftPar = 0;
        var rightPar = 0;

        leftPar = results[m-1][n-1];
        if (n < m) {
            rightPar = results[m-1][n];
        }

        return (n + 1)*(leftPar + rightPar);
    }
}

// m: rows of triangle
// loc: container for triangle (expect div)
function tNumberGenerateFunc(m, loc) {
    loc.innerHTML = "";
    var results = [];
    // construct solution array while creating triangle
    for (var i = 0; i < m; ++i) {
        results[i] = [];
        loc.innerHTML = loc.innerHTML + "<p>"
        for (var j = 0; j <= i; ++j) {
            if (j == 0 || i == 0) {
                results[i][j] = 1;
            }
            else {
                var leftPar = 0;
                var rightPar = 0;
                leftPar = results[i-1][j-1];
                if (j < i) {
                    rightPar = results[i-1][j];
                }
                results[i][j] = (j + 1)*(leftPar + rightPar);
            }
            loc.innerHTML = loc.innerHTML + results[i][j] + " ";
        }
        loc.innerHTML = loc.innerHTML + "</p>"
    }
}