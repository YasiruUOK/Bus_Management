import { Injectable } from '@angular/core';
import { Bus } from './bus';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  busesRef: AngularFireList<any>;
  busRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  /* Create bus */
  AddBus(bus: Bus) {
    this.busesRef.push({
      bus_number: bus.bus_number,
      owner_name: bus.owner_name,
      route: bus.route,
      register_date: bus.register_date,
      permision: bus.permision,
      price: bus.price
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get book */
  GetBus(id: string) {
    this.busRef = this.db.object('buses-list/' + id);
    return this.busRef;
  }  

  /* Get book list */
  GetBusList() {
    this.busesRef = this.db.list('buses-list');
    return this.busesRef;
  }

  /* Update book */
  UpdateBus(id, bus: Bus) {
    this.busRef.update({
      bus_number: bus.bus_number,
      owner_name: bus.owner_name,
      route: bus.route,
      register_date: bus.register_date,
      permision: bus.permision,
      price: bus.price
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete book */
  DeleteBook(id: string) {
    this.busRef = this.db.object('buses-list/' + id);
    this.busRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}
