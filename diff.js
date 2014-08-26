/*
 * Authored: SilentPenguin
 * 
 * Obligatory warning:
 * Software provided as is, free and open, with no warrenty or assurances, you're on your own.
 * Do with this code what you will. Say thank you, but do not blame me for it.
 * Please republish any changes you make.
 */

var Diff = function () { };

Diff.prototype.tokens = function () { };
Diff.prototype.diff = function (oldString, newString) {
    oldString = this.tokens(oldString);
    newString = this.tokens(newString);
    var sequence = this.LongestCommonSubsequence(oldString, newString),
        backtrack = this.Backtrack(sequence, oldString, newString),
        result = this.Aggregate(backtrack);
    return result;
};

Diff.prototype.LongestCommonSubsequence = function (oldTokens, newTokens) {
    var oldLength = oldTokens.length + 1,
        newLength = newTokens.length + 1,
        C = new Array(oldLength);

    //calcuate the LCS matrix
    for (var i = 0; i < oldLength; i++) {
        C[i] = new Array(newLength);
        for (var j = 0; j < newLength; j++) {
            if (i && j) {
                if (oldTokens[i - 1] == newTokens[j - 1]) {
                    C[i][j] = C[i - 1][j - 1] + 1;
                } else {
                    C[i][j] = Math.max(C[i][j - 1], C[i - 1][j]);
                }
            } else {
                C[i][j] = 0;
            }
        }
    }

    return C;
};

Diff.prototype.Backtrack = function(C, oldTokens, newTokens)
{
    var i = oldTokens.length,
        j = newTokens.length,
        B = new Array();

    while (i > 0) {
        if (j > 0 && oldTokens[i - 1] == newTokens[j - 1]) {
            i--;
            j--;
            B.unshift({ e: '=', v: oldTokens[i] });
        } else if (j > 0 && C[i][j - 1] >= C[i - 1][j]) {
            j--;
            B.unshift({ e: '+', v: newTokens[j] });
        } else {
            i--;
            B.unshift({ e: '-', v: oldTokens[i] });
        }
    }

    return B;
};

Diff.prototype.Aggregate = function (B) {
    var R = new Array(),
        current = null;

    for (var i = 0; i < B.length; i++) {
        var item = B[i];
        switch (item.e) {
            case '=':
                if (!current || item.e != current.e) {
                    current = { e: '=', o: '', n: '' };
                    R.push(current);
                }
                current.o += item.v;
                current.n += item.v;
                break;
            case '-':
                if (!current || item.e != current.e) {
                    if (!current || current.e == '=') {
                        current = { e: '-', o: '', n: '' };
                        R.push(current);
                    } else {
                        current.e = '~';
                    }
                }
                current.o += item.v;
                break;
            case '+':
                if (!current || item.e != current.e) {
                    if (!current || current.e == '=') {
                        current = { e: '+', o: '', n: '' };
                        R.push(current);
                    } else {
                        current.e = '~';
                    }
                }
                current.n += item.v;
        }
    }

    return R;
}


var DiffChars = new Diff(false);
DiffChars.tokens = function (string) {
    return string;
};

var DiffWords = new Diff(false);
DiffWords.tokens = function (string) {
    return string.split(/\b/);
};

var DiffLines = new Diff(false);
DiffLines.tokens = function (string) {
    return string.split(/^/);
};
