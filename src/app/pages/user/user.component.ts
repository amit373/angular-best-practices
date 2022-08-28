import { Component, OnInit } from '@angular/core';

import { APIEndPoint } from '@app/core';
import { RestApiService } from '@app/shared/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private readonly restApiService: RestApiService) {}
  public ngOnInit(): void {
    this.restApiService.invoke(APIEndPoint.GET_USERS).subscribe((users) => {
      console.log({ users });
    });
  }
}
