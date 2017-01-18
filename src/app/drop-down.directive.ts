import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[rbDropDown]'
})
export class DropDownDirective {
  /* class.open will be added to the hosting element (who uses the directive) if isOpen=true
     executed on a change of the property isOpen
  */
@HostBinding('class.open') get opened(){
  return this.isOpen;
}
@HostListener('click') open(){
  this.isOpen=true;
}

@HostListener('mouseleave') close(){
  this.isOpen=false;
}
private isOpen=false;

}
