import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/House';
import { HousesService } from 'src/app/services/houses';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.sass'],
})
export class HousesComponent implements OnInit {
  houses: House[] = [];
  page = 1;

  constructor(private houseService: HousesService) {}

  ngOnInit(): void {
    // this.houseService.getHouses(this.page).then(data => {
    //   console.log(data)
    //   this.houses = data
    //   console.log(this.houses)
    // })
  }
}
