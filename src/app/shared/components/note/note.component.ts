import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Groups } from '../../enums/groups.enum';
import { Note, User } from '../../models';
import { NotesService } from '../../services';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  allResources: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Note,
    public dialogRef: MatDialogRef<NoteComponent>,
    private fb: FormBuilder,
    private router: Router,
    private service: NotesService
  ) {
    this.noteForm = this.initForm();
    this.allResources = this.service.filteredUsers;
  }

  ngOnInit(): void {
    this.noteForm = this.initForm();
  }

  goToNote(note: Note): void {
    this.router.navigate(note?.id ? ['notes', note?.id] : ['notes/new']);
    this.dialogRef.close();
  }

  initForm(): FormGroup {
    const disabled = this.data?.readOnly;
    return this.fb.group({
      id: [this.data?.id],
      title: [{ value: this.data?.title, disabled }, Validators.required],
      content: [{ value: this.data?.content, disabled }],
      group: [{ value: this.data?.group, disabled }],
      creator: [this.data?.creator || ''],
      resources: [
        {
          value: this.data?.resources,
          disabled:
            (this.data?.id &&
              this.service.sessionToken.name !== this.data?.creator) ||
            disabled,
        },
      ],
    });
  }

  get changedNote(): Note {
    return this.noteForm.value;
  }

  get groups(): typeof Groups {
    return Groups;
  }
}
