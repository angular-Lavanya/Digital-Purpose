import {Component, OnInit} from '@angular/core';
import {IdeaService} from "../../services/idea.service";
import {Idea} from "../../model/idea";
import {debounceTime, finalize} from "rxjs/operators";
import {faSearch, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GOALS} from "../../model/goal";
import{ Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  spinnerIcon = faSpinner;
  searchIcon = faSearch;
  goals = GOALS;

  searchForm: FormGroup;

  loading: boolean;
  loadingError: any;
  ideas: Idea[];

  constructor(private ideaService: IdeaService,
              private formBuilder: FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      goal: ['']
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.search());

    this.search();
  }

  search() {
    this.loading = true;
    this.ideaService.search(this.searchForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(ideas => this.ideas = ideas, error => this.loadingError = error);
  }

  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }
}
