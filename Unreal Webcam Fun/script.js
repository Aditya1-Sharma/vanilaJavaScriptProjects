const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true , audio:false})
             .then(localMediaStream=>{
                console.log(localMediaStream);
                video.srcObject = localMediaStream;
                video.play();
             }).catch(err=>{
                console.log(err);
             })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.log(width , height);

    canvas.width = width;
    canvas.height = height;

    return setInterval(()=>{
        ctx.drawImage(video , 0 , 0 , width , height);
        // Take the pixels out
        let pixels = ctx.getImageData(0 , 0 , width , height);
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels)
        // ctx.globalalpha(0.1);
        ctx.putImageData(pixels , 0 ,0);
    } , 16);

}


function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download' , 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="handsome man" />`;
    strip.insertBefore(link , strip.firsChild);

}

function redEffect(pixels){
    for(let i = 0; i<pixels.data.length; i+=4){
        pixels.data[i+0] = pixels.data[i+0] + 100;
        pixels.data[i+1] = pixels.data[i+0] -110;
        pixels.data[i+2] = pixels.data[i+0] * 0.5;
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i<pixels.data.length; i+=4){
        pixels.data[i-150] = pixels.data[i] ;
        pixels.data[i+200] = pixels.data[i+1] ;
        pixels.data[i-500] = pixels.data[i+2] ;
    }
    return pixels;
}


getVideo();
video.addEventListener('canplay' , paintToCanvas);

