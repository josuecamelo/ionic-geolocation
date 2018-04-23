import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  loc = {
    lat: 0,
    long: 0
  };

  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
        this.loc.lat = resp.coords.latitude;
        this.loc.long = resp.coords.longitude;
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.loc.lat = data.coords.latitude;
      this.loc.long = data.coords.longitude;
    });
  }
}
