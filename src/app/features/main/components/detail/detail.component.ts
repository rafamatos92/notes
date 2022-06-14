import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { Groups } from 'src/app/shared/enums/groups.enum';
import { Note, User } from 'src/app/shared/models';
import { NotesService } from 'src/app/shared/services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  noteForm: FormGroup;
  note: Note = {};
  allResources: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: NotesService,
    private dialog: MatDialog
  ) {
    this.noteForm = this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.note = this.service.noteById(+id);
      this.noteForm = this.initForm(this.note);
    });
    this.allResources = this.service.filteredUsers;
  }

  save(note: Note) {
    note.id ? (this.service.edit = note) : (this.service.newNote = note);
    this.router.navigate(['../']);
  }

  openOldNote(note: Note) {
    this.dialog.open(NoteComponent, {
      data: {
        readOnly: true,
        ...note,
      },
    });
  }

  get groups(): typeof Groups {
    return Groups;
  }

  initForm(note?: Note): FormGroup {
    return this.fb.group({
      id: [note?.id || ''],
      title: [note?.title || '', Validators.required],
      group: [note?.group || ''],
      content: [note?.content || ''],
      creator: [note?.creator || ''],
      resources: [
        {
          value: note?.resources,
          disabled: this.service.sessionToken.name !== note?.creator,
        } || '',
      ],
    });
  }
}
