import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NoteComponent } from 'src/app/shared/components/note/note.component';
import { Note, User } from 'src/app/shared/models';
import { NotesService } from 'src/app/shared/services';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralComponent implements OnInit {
  list: Note[] = [];
  
  constructor(
    public dialog: MatDialog,
    private service: NotesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list = this.service.notes;
  }

  deleteNote({ id }: Note): void {
    if (id) {
      this.service.remove = id;
      this.list = this.service.notes;
    }
  }

  editNote(note: Note): void {
    this.service.edit = note;
    this.list = this.service.notes;
  }

  createNote(): void {
    this.dialog
      .open(NoteComponent)
      .afterClosed()
      .pipe(filter((note: Note) => !!note))
      .subscribe((note: Note) => {
        this.service.newNote = note;
        this.list = this.service.notes;
        this.router.navigate(['notes']);
      });
  }

  updateNote(note: Note): void {
    this.dialog
      .open(NoteComponent, {
        data: {
          ...note,
        },
      })
      .afterClosed()
      .pipe(filter((note: Note) => !!note))
      .subscribe((note: Note) => {
        this.service.edit = note;
        this.list = this.service.notes;
        this.router.navigate(['notes']);
      });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  get userName() {
    return this.service.sessionToken?.name;
  }
}
