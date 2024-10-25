const image = document.getElementsByClassName('img');

let index = 0;

function showImage(index){
    for(let i = 0; i< image.length; ++i)
        if(!image[i].classList.contains('hidden'))
            image[i].classList.add('hidden');
    image[index].classList.remove('hidden');
}

function prev(){
    index--;
    if(index < 0)
        index = image.length - 1;
    showImage(index);
}

function next(){
    index++;
    if(index >= image.length)
        index = 0;
    showImage(index);
}