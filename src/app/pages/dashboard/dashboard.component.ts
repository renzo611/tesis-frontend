import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  username!:String;
  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
  }

  constructor(private tokenService:TokenService){
  }
}
