function stupid(user){
    with(user){
        name = "Jane";
    }
}

var jane = {name :""}

stupid(jane)
console.log(jane.name)

var joe = {email:"joe@mail.com"}

stupid(joe)
console.log(joe.name)
console.log(name)