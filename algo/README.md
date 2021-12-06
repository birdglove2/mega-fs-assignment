# About

This algorithm is the python function to solve the following question

# Question

Write a function solve(wordList, target) in any language to solve the following problem:

- Input: a list of distinct strings wordList, and a target word target.
- Output: Return 2 words (not necessarily distinct) that combined (concatenated) to the target word. (Any pair is fine if multiple solutions exist). If no pair exists, return None.
- Example:
  1. wordList = [“ab”, “bc”, “cd”], target = “abcd” ==> output = (“ab”, “cd”) or (“cd”, “ab”)
  2. wordList = [“ab”, “bc”, “cd”], target = “cdab” ==> output = (“ab”, “cd”) or (“cd”, “ab”)
  3. wordList = [“ab”, “bc”, “cd”], target = “abab” ==> output = None

# Answer

1. `Brute force` - Iterate through the wordList using i and j, pair every element possible and compare with the target. Return the pairs if found one. Return None if there is no match.
   Time Complexity is O(n^2) from matching every pair possible. Space Complexity is O(1)

2. `Replace` - Iterate through the wordList, if found word in wordList such that it is also part of the target, keep the word and iterate to the next element.
   Time Complexity is O(nk) where k is the length of target word after every replacement which is 2 in this case. Space Complexity is O(1)

# Getting Started

```
python3 main.py
```

You will see the result of both methods, funcion `solve` for the first method, `solve2`for the second method.
