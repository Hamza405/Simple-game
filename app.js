new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        gameStart: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100,
            this.monsterHealth = 100
        },
        attack: function(){
            var damage = this.calculateDamage(10,3);
            this.monsterHealth -=  damage;
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hit monster for ' + damage
            })
            if(this.checkWin()){
                return;
            }
            this.mosterAttack();
        },
        specialAttack: function(){
            var damage =this.calculateDamage(20,10);
            this.monsterHealth -=  damage;
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hit monster for ' + damage
            })
            if(this.checkWin()){
                return;
            }
           this.mosterAttack();
        },
        heal:function(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
                this.turns.unshift({
                    isPlayer:true,
                    text: 'Player heal for 10'
                })
                
            }else{
                this.playerHealth=100;
                this.turns.unshift({
                    isPlayer:true,
                    text: 'Player full health'
                })
            }
           
            this.mosterAttack();
        },
        giveUp:function(){
           this. gameIsRunning=false;
        },
        mosterAttack : function(){
            var damage = this.calculateDamage(12,5);
            this.playerHealth -=damage;
            this.turns.unshift({
                isPlayer:false,
                text: 'Monster hit player for ' + damage
            })
            this.checkWin();
        },
        calculateDamage : function(max,min){
           return Math.max(Math.floor(Math.random() * max)+1,min);
        },
        checkWin:function(){
            if(this.monsterHealth <=0){
                if(confirm('You win!, do you want play new game?')){
                    this.gameStart();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
                
            }else if(this.playerHealth <=0){
                if(confirm('You loss!, do you want play new game?')){
                    this.gameStart();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        }
    }
});