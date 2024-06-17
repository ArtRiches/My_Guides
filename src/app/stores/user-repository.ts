import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';

import { Users } from '../interfaces/users';

interface AuthProps {
  user: { id: Users } | null;
}

const authStore = createStore(
  { name: 'auth-store' },
  withProps<AuthProps>({ user: null })
);

@Injectable({ providedIn: 'root' })
export class AuthRepository {
  user$ = authStore.pipe(select((state) => state.user));

  updateUser(user: AuthProps['user']) {
    authStore.update((state) => ({
      ...state,
      user,
    }));
  }
}
