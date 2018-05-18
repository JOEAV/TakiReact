class Timer{
    constructor(){
        this.count;
        this.hour;
        this.min;
        this.sec;
        this.ms;
    };
    stop() {
        if (this.count) {
            clearInterval(this.count);
            this.count = null;
        }
    }

    start(){
        let update = function(txt){
            let  temp = document.getElementById("timer");
            temp.firstChild.nodeValue = txt;
        }
       let pad =  function(time){
            let  temp;
            if(time < 10){
                temp = "0" + time;
            }
            else{
                temp = time;
            }
            return temp;
        }
        if(!this.count){
            this.ms = 0;
            this.sec = 0;
            this.min = 0;
            this.hour = 0;
            this.count = setInterval(function(){
                if(this.min==60){
                    this.min=0;
                    this.hour++;
                }
                if(this.ms == 100){
                    this.ms = 0;
                    if(this.sec == 60){
                        this.sec = 0;
                        this.min++;
                    }
                    else{
                        this.sec++;
                    }
                }
                else{
                    this.ms++;
                }

                let halt = pad(this.hour);
                let malt = pad(this.min);
                let salt = pad(this.sec);
                let msalt = pad(this.ms);


                update( malt + ":" + salt );
            }, 10);
        }


    }

}

const timer = new Timer();
export default timer;
