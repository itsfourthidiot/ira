import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instr-dashboard',
  templateUrl: './instr-dashboard.component.html',
  styleUrls: ['./instr-dashboard.component.css']
})
export class InstrDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  id:number = 1;

  openModal(){
    console.log("Opened");
    this.router.navigate([`/courseDetails/${this.id}`]);
  }
}
