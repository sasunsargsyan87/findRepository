import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {RepasitoryData} from '../interface';
import {ReposService} from '../repos.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   userNameRepos: string = '';
   answer: any;
   flag: boolean = false;


  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router,
              private reposService: ReposService) {
  }

  ngOnInit(): void {
  }

  search () {
    if (this.userNameRepos === ''){
      this.snackBar.open('Type as: owner/:repositoryName', '', {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-accent'],
        verticalPosition: 'top'
      });
    }else {
       this.http.get('https://api.github.com/repos/' + this.userNameRepos).subscribe((data) => {
        console.log(data);
         this.answer = data;
      },
      error => this.flag = true
    );
     if (this.answer != null){
         this.router.navigate(['/answers'], {
          queryParams: {owner: this.answer.owner.login,
            fullName: this.answer.full_name,
            starCount: this.answer.stargazers_count,
            url: this.answer.html_url
          }
         });
        this.userNameRepos = '';
        this.flag = false;
      }
    }
  }
}
