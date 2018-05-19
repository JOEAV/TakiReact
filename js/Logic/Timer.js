import {timeElapsed} from "../Controllers/controller";
import timeToString from "../serviceUtils/timeUtils"
class Timer{
    constructor(){
        this.count;
        this.hour;
        this.min;
        this.sec;
        this.ms;
        this.timeElapsed="00:00";
    };

    stop(){
        if (this.count) {
            clearInterval(this.count);
            this.count = null;
        }
    }

    start(){
        let update = (txt)=>{
            this.timeElapsed=txt;
            timeElapsed();

        }

            if (!this.count) {
                this.ms = 0;
                this.sec = 0;
                this.min = 0;
                this.hour = 0;

                this.count = setInterval(()=> {
                    if (this.min == 60) {
                        this.min = 0;
                        this.hour++;
                    }
                    if (this.ms == 100) {
                        this.ms = 0;
                        if (this.sec == 60) {
                            this.sec = 0;
                            this.min++;
                        }
                        else {
                            this.sec++;
                        }
                    }
                    else {
                        this.ms++;
                    }
                    let time={sec:this.sec,min:this.min};
                    update(timeToString(time,false));
                }, 10);
            }
    }

}

const timer = new Timer();
export default timer;
