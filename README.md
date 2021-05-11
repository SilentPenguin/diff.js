Diff
====

Creates an diff of two strings in javascript.

Simply call `Diff.diff(oldString, newString);` and an array of differences will be returned.

Tokenising
==========
The strings are converted into tokens, which are then tested. Three tokenisers are provided for free.
`DiffChars` breaks into characters, `DiffWords` into word boundries and `DiffLines` into lines.
To use these tokenisers, simply replace `Diff` with the tokeniser listed above.

If you wish to implement your own tokeniser, set `tokens` on the prototype for your `Diff` to the tokeniser implementation.
Tokenisers must accept a string to tokenise and return an array of equatable tokens.

Return Result
=============

`diff()` will return an array that contains objects which explain the changes that have occurred between `oldString` and `newString`.
Each object has three properties:

  * `e` represents how the tokens equated. `=` means the two tokens are identicle, `+` means the tokens have been added, `-` means tokens were removed, finally `~` means that tokens were substituted.
  * `o` is the old value for a given string.
  * `n` is the new value for that given string.

Tokens will be concatinated together if they are the same type.
This means `o` and `n` may contain more than one character, word or line, and their lengths may not match.
