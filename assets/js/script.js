let log = new Log(document.querySelector('.log'))//instância de log, seu paramentro recebeu a class log doelemento do DOM
let char = new Knight('Jonatas')//Instância de Knight que recebeu parâmetro 'Jonatas'
let monster = new BigMonster()//Instância de BigMonster, o name de constructor foi definido com super(), na pasta classes.js
//Instância de cenário, que recebe variável char, moster, id do DOM #char, ID do DOM #monster e variável log
const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
)
//É executado o método start dentro do objeto stage
stage.start();