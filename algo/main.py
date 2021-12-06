# Brute force - pair every i and j 
def solve(wordList, target):
  for i in range(len(wordList)):
    for j in range(i+1,len(wordList)):
      if target == wordList[i] + wordList[j] or target == wordList[j] + wordList[i]:
        return (wordList[i], wordList[j])
  
  return None

# Replace
def solve2(wordList,target):
  result = []
  for word in wordList:
    if word in target:
      target = target.replace(word, "", 1)
      result.append(word)
      
      if len(result) >= 2:
        return (result[0],result[1])

  return None



def main():
  print("Brute force")
  print('1.', solve(["ab", "bc", "cd"],"abcd"))
  print('2.', solve(["ab", "bc", "cd"],"cdab"))
  print('3.', solve(["ab", "bc", "cd"],"abab"))
  print("----------")

  print("Replace")
  print('1.', solve2(["ab", "bc", "cd"],"abcd"))
  print('2.', solve2(["ab", "bc", "cd"],"cdab"))
  print('3.', solve2(["ab", "bc", "cd"],"abab"))
  print("----------")


main()