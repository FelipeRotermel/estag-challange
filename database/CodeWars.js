/* Categorize New Number */

function openOrSenior(data){
  arr = []
  
  data.map(person =>{
    person[0] >= 55 && person[1] > 7 ? arr.push('Senior') : arr.push('Open')
  })
    
  return arr
}

/* Moving Zeros To The End */

var moveZeros = function (arr) {

  return arr.filter(number => {return number !== 0}).concat(arr.filter(number => {return number === 0}));

}

/* Who likes it? */

function likes(names) {
  
  if(names.length > 3) {
    return `${names[0]}, ${names[1]} and ${names.length -2} others like this`
  } else if(names.length === 3) {
    return `${names[0]}, ${names[1]} and ${names[2]} like this`
  } else if(names.length === 2) {
    return `${names[0]} and ${names[1]} like this`
  } else if(names.length === 1) {
    return `${names[0]} likes this`
  } else {
    return 'no one likes this'
  }
  
}

/* Take a Ten Minutes Walk */

function isValidWalk(walk) {
  
  let x = 0
  let y = 0
  
  for(var i=0; i < 10; i++){
    if(walk[i] == 'n'){
      y++
    } else if(walk[i] == 's'){
      y--
    } else if(walk[i] == 'w'){
      x++
    } else {
      x--
    }
  }
  
  return x==0 && y==0 && walk.length == 10 ? true : false
}

/* Split Strings */

function solution(str){
  
  arr = [str]
  arr2 = [str + '_']
  
  if(arr == "") {return []}
  
  return str.length % 2 === 0 ? (arr.join('')).match(/.{1,2}/g) : (arr2.join('')).match(/.{1,2}/g)
  
}

/* Get the Middle Character */

function getMiddle(s){
  
  let avg = Math.round((s.length) / 2)
  
  return s.length % 2 === 0 ? s[avg -1] + s[avg] : s[avg-1]
  
}

/* Number of People in the Bus */

var number = function(busStops){
  
  let sum=0
  
  busStops.map(stop =>{ sum += stop[0] - stop[1] })
  
  return sum
  
}

/* You're a square */

var isSquare = function(n){
  return Math.sqrt( n ) % 1 === 0 ? true : false
}

/* Find the divisors! */

function divisors(integer) {
  
  let arr = []
  
  for(var i=2; i < integer; i++){
    if(Number.isInteger(integer / i)){
      arr.push(i)
    }
  }
  
  return arr.length !== 0 ? arr : `${integer} is prime`
  
};

/* String ends with? */

function solution(str, ending){

  return str.endsWith(ending);

}

/* Leap Years */

function isLeapYear(year) {
  
  if(year % 100 === 0 && year % 4 === 0 && year % 400 !== 0){
    return false
  } else if(year % 4 === 0 || year % 400 === 0){
    return true
  } else {
    return false
  }
  
}

/* Stop gninnipS My sdroW! */

function spinWords(string){
  
  str = string.split(' ')
  arr = []
  
  for(var i=0; i < string.split(" ").length; i++){
    if(string.split(" ")[i].length >= 5){
      arr.push(str[i].split('').reverse().join(''))
    } else {
      arr.push(str[i])
    }
  }
  
  return arr.toString().replaceAll(',',' ')
}

/* Array.diff */

function arrayDiff(a, b) {
  
  arr = []
  
  a.map(number => {
    b.indexOf(number) == -1 ? arr.push(number) : null
  })
  
  return arr
  
}

/* Does my number look big in this */

function narcissistic(value) {

  let numbers = value.toString().split('')
  let pot = value.toString().length
  let result = 0
  
  numbers.map(number => {
    result += number ** pot
  })

  return result === value ? true : false
  
}

/* Printer Errors */

function printerError(s) {
  return (`${s.length - s.match(/[a-m]/g).length}/${s.length}`)
}

/* Exes and Ohs */

function XO(str) {
  
  let x = (str.match(/[xX]/g) || []).length
  let o = (str.match(/[oO]/g) || []).length

  return x === o
}

/* Vowel Count */

function getCount(str) {
  return str.match(/[aeiou]/g) !== null ? str.match(/[aeiou]/g).length : 0
}

/* Convert string to camel case */

function toCamelCase(str){
  
  let word = str.replaceAll('_',' ').replaceAll('-',' ').split(' ')
  let arr = [word[0]]
  
  for(let i=1; i < word.length; i++){
    arr.push(word[i].substr(0,1).toUpperCase() + word[i].substr(1,word[i].length))
  }
  
  return arr.toString().replaceAll(',','').replaceAll('-','')
  
}

/* Find The Parity Outlier */

function findOutlier(integers){
  
  let odd = []
  let even = []
  
  integers.map(number => {
    if(number % 2 === 0){
      even+= number
    } else {
      odd+= number
    }
  })

  return odd.length < even.length ? Number(odd) : Number(even)
  
}

/* Count the smiley faces! */

function countSmileys(arr) {
  
  let smiles = /:\)|:D|;-D|;\)|:-\)|;-\)|:~\)|;~\)|;~D|;D|:~D|:-D|:~\)/g;
  let count = 0
  
  arr.map(smile => {
    if(smile.match(smiles)) {
      count++
    }
  })
  
  return count
  
}

/* Find the next perfect square! */

function findNextSquare(sq) {
  return Number.isInteger(Math.sqrt(sq)) ? (Math.sqrt(sq) + 1) ** 2 : -1
}

/* Each n-th element of list */

function each(n, xs) {
  
  let arr = []
  
  if(n == 0 || xs.length == 0){
    return []
  }

  if(n > 0) {
    for(var i=n -1; i < xs.length; i+=n) {
      arr.push(xs[i])
    }
  } else {
    const arre = xs.reverse()
    for(var i=(n * -1) -1; i < xs.length; i+=n * -1){
      arr.push(arre[i])
    }
  }
  
  return arr

}

/* IndexOf Array in Array */

var searchArray = function (arrayToSearch, query) {
  
  var num = []
  
  if(query.length != 2){
    throw new Error('throw error')
  }
  
  arrayToSearch.map(item => {
    if(item.length != 2){
      throw new Error('throw error')
    } 
  })
  
  arrayToSearch.filter((value,index) => {
    query[0] == value[0] && query[1] == value[1] ? num.push(index) : -1
  })
  
  return num[0] > 0 ? num[0] : -1
}

/* Square Every Digit */

function squareDigits(num){
  
  const numb = num.toString()
  let arr = []
  let numarr = []
  
  for(var i=0; i < numb.length; i++){
    arr.push(numb.charAt(i))
  }
  
  arr.map(n => {
    numarr.push(n ** 2)
  })
  
  return Number(numarr.join().replaceAll(',',''))
  
}

/* Build Tower */ 

function towerBuilder(nFloors) {
  
  const tower = []
  
  for(var i=1; i <= nFloors; i++){
    var brick = '*'.repeat((i * 2) -1)
    var space = ' '.repeat(nFloors - i)
    console.log(brick,space)
    tower.push(space + brick + space)
  }

  return tower

}

/* Count characters in your string */

function count(string) {
  
  let arr = []
  let obj = {}

  for (var i = 0; i < string.length; i++) {
    arr.push(string.charAt(i));
  }

  arr.map((a) => {
    if(obj.hasOwnProperty(a)){
      obj[a] += 1
    } else {
      obj[a] = 1
    }
  });

  return obj
}

/* Pyramid Array */

function pyramid(n) {
  
  const pyramid = []
  
  if(n == 0){ return [] }
  
  for(var i=1; i <= n; i++) {
    pyramid.push(Array(i).fill((1)).flat())
  }
  
  return pyramid
  
}