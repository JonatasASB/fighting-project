//Criada a classe de Personagem
class Character {
    //Adicionado propriedades do Personagem
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;
    //Inicialização do objeto
    constructor(name) {
        //Recebe name como parâmetro
        this.name = name
    }
    //faz um get para obter o valor de  _life que é uma conveção privada
    get life() {
        return this._life
    }
    //Verifica que o _life não pode ser menor que 0
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife
    }
}
// Criando a Classe Knight que é herdado de Personagem
class Knight extends Character {
    //Inicialização do objeto
    constructor(name) {
        //Recebe o mesmo name de quem herdou (no caso Personagem) & definição das propriedades
        super(name)
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life
    }
}
//Criando classe de Sorceres que é herdade de Personagem
class Sorceres extends Character {
    //Inicialização do objeto
    constructor(name) {
        //Recebe o mesmo name de quem herdou (no caso Personagem) & definição das propriedades
        super(name)
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life
    }
}
//Criando classe de Little Monster que é herdado de Personagem
class LittleMonster extends Character {
    constructor() {
        //Foi chamado o constructor de seu "PAI" e foi defincido como Big Monster
        super('Little Monster')
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}
//Criando classe de Little Monster que é herdado de Personagem
class BigMonster extends Character {
    constructor() {
        //Foi chamado o constructor de seu "PAI" e foi defincido como Big Monster
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life
    }
}
//Foi Criada a class Cenário
class Stage {
    //Recebe Lutador 1, Lutador 2, Elemento do Lutador 1, Elemento do Lutador 2 e log como parâmentros, 
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El
        this.log = logObject
    }
    //Criado um método que de inicia e executa outro método que é responsável por atualizar o combate
    start() {
        this.update();

        //Seleciona o DOM e adiciona
        //Evento de ataque do Lutador 1, definido pelo método doAttack
        this.fighter1El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));

        //Seleciona o DOM e adiciona
        //Evento de Ataque do Lutador 2, definido pelo método doAttack
        this.fighter2El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }
    //Método responsável por atualizar o combate
    update() {

        // FIGHTER 1
        //Informa o nome e quantidade de HP do elemento DOM que foi manipulado "No caso a Class name"! toFixed(1) para haverá somente 1 casa decimal
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`

        //Cria-se um variável para receber a porcentagem de vida do Lutador 1
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100

        //Altera o tamanho do DOM que foi selecionado, conforme a variável f1Pct, que foi criada anteriormente
        this.fighter1El.querySelector('.life-bar .bar').style.width = `${f1Pct}%`

        //Condição para que  o Dom de .bar altera confrme a porcentagem de vida 
        if (f1Pct <= 10) {

            this.fighter1El.querySelector('.life-bar .bar').style.backgroundColor = 'red'

        } else if (f1Pct <= 50) {

            this.fighter1El.querySelector('.life-bar .bar').style.backgroundColor = 'orange'
        }

        //  FIGHTER 2
        //Informa o nome e quantidade de HP do elemento DOM que foi manipulado "No caso a Class name"! toFixed(1) para haverá somente 1 casa decimal
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`

        //Cria-se um variável para receber a porcentagem de vida do Lutador 1
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100

        //Altera o tamanho do DOM que foi selecionado, conforme a variável f1Pct, que foi criada anteriormente
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`

        //Condição para que  o Dom de .bar altera confrme a porcentagem de vida
        if (f2Pct <= 10) {

            this.fighter2El.querySelector('.bar').style.backgroundColor = 'red'

        } else if (f2Pct <= 50) {

            this.fighter2El.querySelector('.bar').style.backgroundColor = 'orange'
        }
    }
    //Criado um método para definir as regras de ataque e defesa
    doAttack(attacking, attacked) {
        // Condição que verifica se o que está atacando está com vida 0, se estiver ele não consegue atacar
        if (attacking.life <= 0) {
            this.log.addMessage(`${attacking.name} está morto`)
            return;
        }
        //Condição para verificar se o que foi atacado está com vida 0, se estiver ele não pode ser atacado
        if (attacked.life <= 0) {
            this.log.addMessage(`${attacked.name} está morto`)
            return;
        }

        //Criada duas variáveis para definir fator de ataque e defesa, que gera um número aleatório e múltiplica por 2, tanto para ataque quanto para defesa
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        //Criada duas variáveis que recebem a força de ataque do primeiro parâmetro * o numero aleatório que foi gerado, tanto para o ataque quanto para defesa
        let actualAttack = attacking.attack * attackFactor
        let actualDefense = attacked.defense * defenseFactor
        
        //Criada condição que ataque só será válido se o valor de ataque for maior que o valor de defesa
        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack

            //Se a condição for satisfeita, a life de quem sofreu o ataque será reduzida do valor de ataque e mostrar na tela, pela função addMessage
            this.log.addMessage(`${attacking.name} tirou ${actualAttack.toFixed(2)} de HP de ${attacked.name}`)
        } else {
            //Mostrar na tela caso o valor da defesa seja maior que o do ataque
            this.log.addMessage(`${attacked.name} conseguiu defender`)
        }
        //Atualiza a tela após todos os métodos serem executados
        this.update();
    }
}
//Criada classe Log
class Log {
    //Criado array vazio
    list = [];
    //Inicizaliado classe Log com parâmetro listEl
    constructor(listEl) {
        this.listEl = listEl
    }
    //Criado método que recebe parâmentro msg, adiciona o parâmetro recebebido no inicio do array
    addMessage(msg) {
        this.list.unshift(msg)
        this.render()
    }
    //Criado um método aque limpa o elemento Dom e cria um li dentro do DOM
    render() {
        this.listEl.innerHTML = ''
        //Loop para ir adicionando valores do Array dentro do DOM
        for (let x in this.list) {
            this.listEl.innerHTML += `<li>${this.list[x]}</li>`
        }
    }
}