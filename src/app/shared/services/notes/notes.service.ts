import { Injectable } from '@angular/core';
import { Note, User } from '../../models';
import * as CryptoJS from 'crypto-js';

const key = 'cocus';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor() {}

  private get storage() {
    if (localStorage.getItem('storage')) {
      return JSON.parse(this.decrypt(localStorage.getItem('storage')) || '{}');
    } else {
      localStorage.setItem('storage', '');
    }
  }

  get notes() {
    const userName = this.sessionToken.name;
    return (
      this.storage?.notes?.filter((note: Note) => {
        return (
          note.creator === userName ||
          note.resources?.find((user) => user === userName)
        );
      }) || []
    );
  }

  get filteredUsers() {
    return (
      this.storage?.users.filter(
        ({ name }: User) => name !== this.sessionToken.name
      ) || []
    );
  }

  get users() {
    return this.storage?.users;
  }

  set newNote(note: Note) {
    debugger;
    localStorage.setItem(
      'storage',
      this.encrypt({
        ...this.storage,
        notes: [
          ...this.notes,
          {
            ...note,
            id: Date.now(),
            updatedAt: new Date(),
            version: 1,
            creator: this.sessionToken.name,
          },
        ],
      })
    );
  }

  set remove(noteId: number) {
    const notes = this.notes.filter(({ id }: Note) => id !== noteId);
    localStorage.setItem('storage', this.encrypt({ ...this.storage, notes }));
  }

  set edit(editedNote: Note) {
    const notes = this.notes.map((note: Note) =>
      editedNote.id === note.id
        ? {
            ...editedNote,
            updatedAt: new Date(),
            version: (note?.version || 0) + 1,
            resources: editedNote?.resources || note?.resources,
            oldVersions: [
              ...(note?.oldVersions || []),
              { ...note, readOnly: true },
            ],
          }
        : note
    );
    localStorage.setItem('storage', this.encrypt({ ...this.storage, notes }));
  }

  set newUserLogin(user: User) {
    localStorage.setItem(
      'storage',
      this.encrypt({
        ...this.storage,
        users: [...(this.storage?.users || []), user],
      })
    );

    sessionStorage.setItem('notesToken', this.encrypt(user));
  }

  set repeatLogin(user: User) {
    sessionStorage.setItem('notesToken', this.encrypt(user));
  }

  get sessionToken() {
    if (sessionStorage.getItem('notesToken')) {
      return JSON.parse(this.decrypt(sessionStorage.getItem('notesToken')));
    } else {
      return sessionStorage.setItem('notesToken', '');
    }
  }

  noteById(noteId: number): Note {
    return this.storage?.notes?.find(({ id }: Note) => id === noteId);
  }

  private encrypt(value: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(value), key).toString();
  }

  private decrypt(value: any): string {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8);
  }
}
