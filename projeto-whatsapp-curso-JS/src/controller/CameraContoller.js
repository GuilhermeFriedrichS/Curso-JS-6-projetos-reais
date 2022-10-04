export class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;
        this._videoEl.setAttribute('autoplay', '');

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{
            
            this._stream = stream;
            console.log(stream);
            this._videoEl.srcObject=stream;
            

        }).catch(err=>{
            console.error(err);
        });
    }

    stop(){

        this._stream.getTracks().forEach(track => {
            
            track.stop();

        });

    }
}