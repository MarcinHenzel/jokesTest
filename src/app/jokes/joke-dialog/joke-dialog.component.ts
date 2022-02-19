import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JokesService } from '../jokes.service';

@Component({
  selector: 'app-joke-dialog',
  templateUrl: './joke-dialog.component.html',
  styleUrls: ['./joke-dialog.component.css'],
})
export class JokeDialogComponent implements OnInit {
  jokeForm!: FormGroup;
  flagsForm!: FormGroup;
  MySchemaFrom!: FormGroup;
  checkboxes: any;
  constructor(
    private jokesService: JokesService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<JokeDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkboxes = (this.jokeForm.get('flags') as any).controls;
  }
  initForm() {
    const jokeContentValidators = [
      Validators.required,
      Validators.minLength(20),
    ];
    this.flagsForm = new FormGroup(
      {
        nsfw: new FormControl(false),
        religious: new FormControl(false),
        political: new FormControl(false),
        racist: new FormControl(false),
        sexist: new FormControl(false),
        explicit: new FormControl(false),
      },
      this.flagValidator()
    );

    this.jokeForm = new FormGroup({
      category: new FormControl('Misc'),
      type: new FormControl('single'),
      joke: new FormControl('', jokeContentValidators),
      flags: this.flagsForm,
      lang: new FormControl('en'),
    });
    this.jokeForm
      .get('type')
      ?.valueChanges.subscribe((type: 'single' | 'twopart') => {
        if (type === 'single') {
          this.jokeForm.addControl(
            'joke',
            new FormControl('', jokeContentValidators)
          );

          this.jokeForm.removeControl('setup');
          this.jokeForm.removeControl('delivery');
        } else {
          this.jokeForm.removeControl('joke');

          this.jokeForm.addControl(
            'setup',
            new FormControl('', jokeContentValidators)
          );
          this.jokeForm.addControl(
            'delivery',
            new FormControl('', jokeContentValidators)
          );
        }
        this.jokeForm.updateValueAndValidity();
      });
  }
  submitForm() {
    this.dialogRef.close()

    this.jokesService.newJoke(this.jokeForm.value).subscribe(
      (resp) => {
        this._snackBar.open(resp.message, 'Success', { duration: 3000 });
      },
      () => {
        this._snackBar.open('Something went wrong', 'Error', {
          duration: 3000,
        });
      }
    );
  }
  flagValidator(): any {
    return (group: FormGroup) => {
      let isAtLeastOneTrue = false;
      for (const field in group.controls) {
        if (group.controls[field].value) {
          isAtLeastOneTrue = true;
        }
      }
      if (isAtLeastOneTrue) group.setErrors({ noFlag: true });
      group.setErrors(null);
    };
  }
 
}
