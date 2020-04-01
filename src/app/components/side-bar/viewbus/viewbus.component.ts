import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Bus } from 'src/app/shared/bus';
import { BusService } from 'src/app/shared/bus.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbus',
  templateUrl: './viewbus.component.html',
  styleUrls: ['./viewbus.component.css']
})
export class ViewbusComponent implements OnInit {

  dataSource: MatTableDataSource<Bus>;
  BusData: any = [];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: any[] = [
    '$key',
    'bus_number',
    'owner_name', 
    'route',
    'register_date',
    'permision',
    'price',
    'action'
  ];
  
  constructor(
    private busApi: BusService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    ){
    this.busApi.GetBusList()
    .snapshotChanges().subscribe(buses => {
        buses.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BusData.push(a as Bus)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BusData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
  }

  ngOnInit() {
  }

  /* Delete */
  deleteBus(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.busApi.DeleteBus(e.$key)
    }
  }
}
