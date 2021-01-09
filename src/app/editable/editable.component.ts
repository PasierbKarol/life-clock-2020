import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { EditModeDirective } from 'src/app/directives/edit-mode.directive';
import { ViewModeDirective } from 'src/app/directives/view-mode.directive';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit {

  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective, {static: false}) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, {static: false}) editModeTpl: EditModeDirective;

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef ){
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;
  }

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick').pipe(
      // untilDestroyed(this)
    ).subscribe(() => {
      this.mode = 'edit';
      this.editMode.next(true);
    });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      // filter(({ target }) => this.element.contains(target) === false),
      take(1)
    )

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      // untilDestroyed(this)
    ).subscribe(event => {
      this.update.next();
      this.mode = 'view';
    });
  }
}
