import { Component, computed, signal } from '@angular/core';

import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  ///// Method #1 //// Angular change detection mechanism (reying on zone.js):
  selectedUser = DUMMY_USERS[randomIndex];

  //getter
  get imagePath() {
    return 'assets/users/' + this.selectedUser.avatar;
  }

  //event with managing state and changing date
  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser = DUMMY_USERS[randomIndex];
  }


  ///// Method #2 //// Signals to notify Angular about changes & updates:
  // signal is an object that stores a value and angular manages subscriptions to the signal to get notified about changes (containers)
  selectedUserWithSignal = signal(DUMMY_USERS[randomIndex]);
  imagePathWithSignal = computed(() => 'assets/users/' + this.selectedUserWithSignal().avatar);

  onSelectUserWithSignal() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUserWithSignal.set(DUMMY_USERS[randomIndex]);
  }
}
