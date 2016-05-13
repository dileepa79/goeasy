// Import Component form the angular core package
import {Component} from 'angular2/core';

// Import the Image interface
import {Image} from './image.interface';

// Compoent Decorator
@Component({
    //Name of our tag
    selector: 'css-carousel',
    //Template for the tag
    templateUrl: './app/carousel/carousel.html',
    //Styles for the tag
    styleUrls: ['./css/img.css'],
})
//Carousel Component itself
export class CSSCarouselComponent {
    //images data to be bound to the template
    public images = IMAGES;
}

//IMAGES array implementing Image interface
var IMAGES: Image[] = [
    { "title": "", "url": "img/profile-pics/finn.png" },
    { "title": "", "url": "img/profile-pics/anu.png" },
    { "title": "", "url": "img/profile-pics/chinthaka.png" },
    { "title": "", "url": "img/profile-pics/twi.png" },
    { "title": "", "url": "img/profile-pics/waruni.png" },
    { "title": "", "url": "img/profile-pics/tushara.png" },
    { "title": "", "url": "img/profile-pics/dileepa.png" }
    
];