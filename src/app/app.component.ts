import { Component, OnInit } from '@angular/core';

import * as git from 'isomorphic-git';
import * as http from 'isomorphic-git/http/web';

import FS from '@isomorphic-git/lightning-fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-16-isomorphic-git';

  async ngOnInit() {
    await this.testClone();
  }

  private async testClone() {
    // Reset lightning-fs filesystem / indexedDB
    if ((await indexedDB.databases())?.find((db) => db.name === 'testClone')) {
      indexedDB.deleteDatabase('testClone');
    }
    const fs = new FS('testClone');

    // Clone isomorphic-git repository from GitHub
    await git.clone({
      fs,
      http,
      dir: '/',
      corsProxy: 'https://cors.isomorphic-git.org',
      url: 'https://github.com/isomorphic-git/isomorphic-git',
      singleBranch: true,
      depth: 1,
      onMessage: (m) => console.log(m),
    });
  }
}
