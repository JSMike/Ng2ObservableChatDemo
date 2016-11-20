import {
  Directive,
  TemplateRef,
  Input,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[obsStreamOut][obsStreamOutFor]'
})
export class StreamOutDirective implements AfterViewInit {
  @Input() obsStreamOutFor: Observable<any>;

  constructor(private tr: TemplateRef<any>, private vcr: ViewContainerRef) { }

  ngAfterViewInit() {
    this.obsStreamOutFor
      .subscribe((chat) => {
        this.vcr.createEmbeddedView(this.tr, { '$implicit': chat });
      });
  }
}
