import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
    selector: '[IsInvalid]'
})
export class IsInvalidDirective implements OnInit{

    constructor(private element: ElementRef, private control: NgControl) { }

    ngOnInit() {
        toogleClassInvalid(this.control, this.element.nativeElement);
    }
}

@Directive({
    selector: '[IsInvalidControl]'
})
export class IsInvalidControlDirective implements OnInit{

    control: NgControl;

    constructor(private element: ElementRef) { }

    ngOnInit() {
        toogleClassInvalid(this.control, this.element.nativeElement)
    }

    @Input()
    set IsInvalidControl(value){
        this.control = value;
    }
}


function toogleClassInvalid(control: NgControl, nativeElement: HTMLElement) {
    control.valueChanges.subscribe(() => {
        if(control.invalid && (control.dirty || control.touched)){
            if(! nativeElement.classList.contains('is-invalid')) {
                nativeElement.classList.add('is-invalid');
            }
        }else{
            nativeElement.classList.remove('is-invalid');
        }
    })
}

