import { User } from '.';
import { Groups } from '../enums/groups.enum';

export interface Note {
  id?: number;
  title?: string;
  content?: string;
  updatedAt?: Date;
  group?: Groups;
  creator?: string;
  resources?: string[];
  version?: number;
  readOnly?: boolean;
  oldVersions?: Note[];
}
