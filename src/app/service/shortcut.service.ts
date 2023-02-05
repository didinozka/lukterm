import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

export enum KeyCode {
  meta = 'metaKey',
  alt = 'altKey',
  shift = 'shiftKey',
  ctrl = 'ctrlKey',
  enter = 'Enter',
  esc = 'Escape',
}

type Key = KeyCode | number | string;
export type Keys = (Key | Key[])[];
export type KeyAction = () => void;
export type Direction = 'up' | 'down';
interface Shortcut {
  keys: Keys;
  action: KeyAction;
  direction?: Direction;
}

@Injectable({
  providedIn: 'root',
})
export class ShortcutService {
  private keyUp$: Observable<KeyboardEvent>;
  private keyDown$: Observable<KeyboardEvent>;
  private shortcuts: Shortcut[] = [];

  constructor() {
    this.keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');
    this.keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown');
    this.keyUp$
      .subscribe((event) => {
        const upKeys = this.shortcuts.filter((s) => s.direction === 'up');
        this.processKey(upKeys, event);
      });
    this.keyDown$
      .subscribe((event) => {
        const downKeys = this.shortcuts.filter((s) => s.direction === 'down');
        this.processKey(downKeys, event);
      });
  }

  public registerShortcut(
    keys: Keys,
    action: KeyAction,
    direction: Direction = 'up'
  ) {
    this.shortcuts.push({ keys, action, direction });
    return this.shortcuts.length - 1;
  }

  public unregisterShortcut(index: number) {
    const tmp = [...this.shortcuts];
    tmp.splice(index, 1);
    this.shortcuts = tmp;
  }

  private processKey(shortcuts: Shortcut[], event: KeyboardEvent) {
    shortcuts.forEach(({ keys, action }) => {
      if (
        keys.every((k: Key | Key[]) => {
          if (Array.isArray(k)) {
            // @ts-ignore
            return k.some(key => event[key] || event.code === key || event.which === key);
          }
          // @ts-ignore
          return event[k] || event.code === k || event.which === k;
        })
      ) {
        action?.();
      }
    });
  }
}
