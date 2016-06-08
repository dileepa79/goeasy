// Import Component form the angular core package
import {Component, Input} from '@angular/core';
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
    @Input() images = [];
}

