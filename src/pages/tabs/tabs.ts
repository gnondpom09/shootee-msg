import { Component } from '@angular/core';
import { ProjectsPage } from '../projects/projects';
import { ModelsPage } from '../models/models';
import { ChatsPage } from '../chats/chats';
import { AccountPage } from '../account/account';
import { UsersPage } from '../users/users';

@Component({
	selector: 'tabs-page',
	templateUrl: 'tabs.html'
})
export class TabsPage {
	projects = ProjectsPage;
	models   = ModelsPage;
	chats    = ChatsPage;
	users    = UsersPage;
  profile  = AccountPage;
}
