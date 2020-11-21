const GameState = Object.freeze({
    WELCOME:   Symbol("welcome"),
    ROOM:  Symbol("room"),
    BOX: Symbol("box"),
    FIGHT: Symbol("fight"),
    DOOR: Symbol("door"),
    JUMPUP: Symbol("jumpup"),
    SECONDLEVEL: Symbol("secondlevel"),
    STAIRS:Symbol("stairs")
});

module.exports = class Game{
    constructor(){
        this.stateCur = GameState.WELCOME;
        this.isdown= false;
    }
    
    makeAMove(sInput)
    {
        let sReply = "Hello";
        switch(this.stateCur){
            case GameState.WELCOME:
                sReply = "Hello ! Welcome to the dark world ! Ready for the thrill !? Are you ready to take the risk ??";
                this.stateCur = GameState.ROOM;
                break;
            case GameState.ROOM:
                if(sInput.toLowerCase().match("yes")){
                    sReply =  "There is a dark black room ! Red eyes are blinking and suddenly monster pops out and offers <strong>red or blue</strong> mystery box! Choose wisely";
                    this.stateCur = GameState.BOX;
                }else{
                    sReply ="You don't have guts to win this game !!";
                    this.stateCur = GameState.WELCOME;
                }
                break;
            case GameState.BOX:
                if(sInput.toLowerCase().match("red")){
                    sReply = "Wonderful....!!!! you got a sword as your superpower and you can use that to kill the monster! Type <strong>sword</strong> to use your Power.";
                    this.stateCur = GameState.FIGHT;
                }
                else{
                    sReply = "Oops..! Best of luck ! Monster is here and you don't have any superpower to fight with the monster.";
                    this.stateCur = GameState.WELCOME;

                }
                break;
            case GameState.FIGHT:
                if(sInput.toLowerCase().match("sword")){
                    sReply = "Fight with the monster..! Do you want to use your superpower..! <strong> yes or no ?</strong>";
                    this.stateCur = GameState.DOOR;

                }else{
                    sReply = "You don't have any superpowers so the monster is going to kill you..! Better luck next time.";
                    this.stateCur = GameState.WELCOME;
                }
                break;
            case GameState.DOOR:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "Congratulations you killed the monster..! Bravo, Heads up to the next level. Do you want to go <strong>upstairs or downstairs ? </strong>?";
                    this.stateCur = GameState.JUMPUP;
                }else{
                    sReply = "oops!! You lost";
                    this.stateCur = GameState.WELCOME;
                }
                break;
                case GameState.JUMPUP:
                    if(sInput.toLowerCase().match("upstairs")){
                        sReply = "There is a weapon on the floor..! Which weapon do you want to use ? <strong>A Spear or A Gun </strong>??";
                        this.stateCur = GameState.STAIRS;
                        this.isdown= false;
                    }
                    
                    if(sInput.toLowerCase().match("downstairs")){
                        sReply = "There is weapon on the floor..! Which weapon do you want to use ? <strong>A Spear or A Gun </strong>??";
                        this.isdown= true;
                        this.stateCur = GameState.STAIRS;
                    }
                    break;
                    case GameState.STAIRS:
                        if(sInput.toLowerCase().match("gun") && this.isdown=== false){
                            sReply = "oops..! it's a dragon, you cannot beat the dragon with the gun..! you lost.";
                            this.stateCur = GameState.WELCOME;
                        }
                        else if (sInput.toLowerCase().match("gun") && this.isdown)
                        {
                            sReply = "Hurrayyyy.. You are a brave warrior..! You killed the Zombie Boss.";
                            this.stateCur = GameState.WELCOME;
                        }
                        else if (sInput.toLowerCase().match("spear") && this.isdown)
                        {
                            sReply = "you cannot kill the Zombie boss with spear";
                            this.stateCur = GameState.WELCOME;
                        }
                    else{
                        sReply = "Bravo..! you killed the dragon boss. you saved the world";
                        this.stateCur = GameState.WELCOME;
                    }
                    
        }
        return([sReply]);
    }
}