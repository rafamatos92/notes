import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ascend, descend, prop, sort } from 'ramda';
import { Subscription } from 'rxjs';
import { Groups } from '../../enums/groups.enum';
import { Note, User } from '../../models';
import { NotesService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() list: Note[] = [];
  @Output() delete = new EventEmitter<Note>();
  @Output() edit = new EventEmitter<Note>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  newList: Note[] = [];
  allResources: User[] = [];

  formFilter: FormGroup;

  subscription: Subscription = new Subscription();

  displayedColumns: string[] = [
    'title',
    'updatedAt',
    'group',
    'creator',
    'version',
    'actions',
  ];

  constructor(
    private service: NotesService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formFilter = this.fb.group({
      resource: [],
      groupBy: [],
      name: [],
    });
  }

  ngOnInit(): void {
    this.allResources = this.service.users;
    this.newList = this.list;

    this.subscription = this.formFilter.valueChanges.subscribe(
      ({ name, resource, groupBy }) => {
        let result = this.list.filter((note: Note) =>
          note.title?.includes(name)
        );
        if (resource)
          result = result.filter(({ creator }: Note) => creator === resource);
        if (groupBy)
          result = result.filter(({ group }: Note) => group === groupBy);
        this.newList = result;
      }
    );
  }

  goToNote(ev: Event, { id }: Note): void {
    ev.stopPropagation();
    this.router.navigate(['notes', id]);
  }

  editNote(note: Note): void {
    this.edit.emit(note);
  }

  deleteNote(note: Note): void {
    this.delete.emit(note);
  }

  getNoteUrl(noteId: string): string {
    return `${window.location.href}/${noteId}`;
  }

  sortData({ active, direction }: { active: string; direction: string }): void {
    const desOrd = descend(prop(active) as any);
    const ascOrd = ascend(prop(active) as any);
    this.newList = sort(direction === 'asc' ? ascOrd : desOrd, this.newList);
  }

  resetFilter(): void {
    this.formFilter.reset();
    this.newList = this.list;
  }

  get groups(): typeof Groups {
    return Groups;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
