let good:number
let club:string = 'real madrid';
console.log(club)
good = 44;
let Famous:boolean = false;
let famous:boolean;
good =39;


//function type

function add(num1:number | string ,num2:number|string){
    return (num1 + num2);
}
add(3,5);
add('addm','git')



function fullName (firstName:string,lastName:string):string{
    return firstName + " " +lastName;
}

const user =  fullName("mrtui","githum")


function doubleItAndConsole(num:number){
    const result = num * 3;
    console.log(result);
}
const output =  doubleItAndConsole(7);
console.log('output '+output)


//arrow

const multiply = (x:number,)