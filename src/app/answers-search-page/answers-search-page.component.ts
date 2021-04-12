import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RepasitoryData} from '../interface';
import {ReposService} from '../repos.service';
import {TableVirtualScrollDataSource} from 'ng-table-virtual-scroll';



@Component({
  selector: 'app-answers-search-page',
  templateUrl: './answers-search-page.component.html',
  styleUrls: ['./answers-search-page.component.css']
})
export class AnswersSearchPageComponent implements OnInit {

  flag = 'black';
  flag1 = false;
  owner: string;
  fullName: string;
  starCount: number;
  url: string;
  answer: any;
  userNameRepos: string = '';
  repositories = [];
  // dataSource = new TableVirtualScrollDataSource();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private reposService: ReposService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.owner = params.owner;
      this.fullName = params.fullName;
      this.starCount = params.starCount;
      this.url = params.url;
    });
   this.reposService.getReposData().subscribe(data => {
     console.log(Object.values(data));
     this.repositories = Object.values(data);
   });
  }

  onEnter () {
    this.http.get('https://api.github.com/repos/' + this.userNameRepos).subscribe((data) => {
        console.log(data);
        this.answer = data;
        this.owner = this.answer.owner.login;
        this.fullName = this.answer.full_name;
        this.url = this.answer.html_url;
        this.starCount = this.answer.stargazers_count;
        this.userNameRepos = '';
      },
      error => this.flag1 = true
    );
  }

  postData (owner, fullName, url, starCount){
    const repositoriesData: RepasitoryData = {
      ownerRepos: owner,
      fullNameRepos: fullName,
      starCountRepos: starCount,
      urlRepos: url
    };
    this.reposService.postReposData(repositoriesData).subscribe(data => {
      this.repositories.push(repositoriesData);
      this.owner = '';
      this.fullName = '';
      this.url = '';
      this.starCount = null;
    });
  }

}
