import { Component } from '@angular/core';
import { IAnime } from './models/kitsu.model';
import { Observable, switchMap, take } from 'rxjs';
import { KitsuService } from './services/kitsu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public dataAnime$: Observable<IAnime[]>;

  public formGroup = new FormGroup({
    offset: new FormControl(0),
    limit: new FormControl(20),
  });

  constructor(private kitsuService: KitsuService) {
    this.dataAnime$ = this.formGroup.valueChanges.pipe(
      switchMap((value:{offset:number, limit:number}) => {
        return this.kitsuService
          .getAnime(+value.limit, +value.offset)
          .pipe(take(1));
      })
    );
    // this.dataAnime$ = this.kitsuService.getAnime(20,0).pipe(take(1));
    // this.formGroup.valueChanges.subscribe((value)=> console.log(value));
  }

  public next() {
    let limit = +this.formGroup.get('limit').value;
    let offset = +this.formGroup.get('offset').value;
    this.formGroup.get('offset').setValue(offset + limit);
  }

  public previous() {
    this.formGroup
      .get('offset')
      .setValue(
        +this.formGroup.get('offset').value - +this.formGroup.get('limit').value
      );
  }
}
