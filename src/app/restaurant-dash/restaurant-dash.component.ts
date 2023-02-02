import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.modal';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formvalue!: FormGroup;
  restaurantModalObj : RestaurantData = new RestaurantData();
  allRestaurantData:any;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAlldata()
  }
// subscribing our data which is mapped via service
 addResto(){
  this.restaurantModalObj.name = this.formvalue.value.name;
  this.restaurantModalObj.email = this.formvalue.value.email;
  this.restaurantModalObj.mobile = this.formvalue.value.mobile;
  this.restaurantModalObj.address = this.formvalue.value.address;
  this.restaurantModalObj.services = this.formvalue.value.services;

  this.api.postRestaurant(this.restaurantModalObj).subscribe(res=>{
    console.log(res);
    alert("Restaurants records are added successfully");
    // clear fill form data 0
    let ref = document.getElementById('clear');
    ref?.click();
    this.formvalue.reset()
    this.getAlldata();
  },
  err=>{
    alert("Something went wrong")
  })
 }

 getAlldata() {
  this.api.getRestaurant().subscribe(res=>{
    this.allRestaurantData = res;
  })
}

//delete records
deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert("Restaurants records are deleted successfully");
    this.getAlldata();
})
}

onEditResto(data:any){
  this.formvalue.controls['id'].setValue(data.id);
  this.formvalue.controls['name'].setValue(data.name);
  this.formvalue.controls['email'].setValue(data.email);
  this.formvalue.controls['mobile'].setValue(data.mobile);
  this.formvalue.controls['address'].setValue(data.address);
  this.formvalue.controls['services'].setValue(data.services);
}

updateResto(){
// this.restaurantModalObj.id = this.formvalue.value.id;
this.restaurantModalObj.name = this.formvalue.value.name;
this.restaurantModalObj.email = this.formvalue.value.email;
this.restaurantModalObj.mobile = this.formvalue.value.mobile;
this.restaurantModalObj.address = this.formvalue.value.address;
this.restaurantModalObj.services = this.formvalue.value.services;
console.log(this.formvalue.value.id);


this.api.updateRestaurant(this.restaurantModalObj,this.formvalue.value.id).subscribe(res=>{
  alert("Restaurants records are updated successfully");
  let ref = document.getElementById('clear');
    ref?.click();
    this.formvalue.reset()
    this.getAlldata();
  
})
}
}
