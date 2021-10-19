import {Component, OnInit} from '@angular/core';
import {Idea} from "../../../model/idea";
import {IdeaService} from "../../../services/idea.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.scss']
})
export class ViewIdeaComponent implements OnInit {

  idea: Idea;

  constructor(private ideaService: IdeaService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ideaService.get(params.ideaId)
        .subscribe(idea => this.idea = idea);
    });
  }

}
