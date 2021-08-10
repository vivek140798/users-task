import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit, OnChanges {
  public listHeader: any;
  public dataList: any;
  public listKeys: any;
  @Input() tableGridData: any;
  @Output() actionEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initialize(this.tableGridData);


  }
  initialize(data) {
    this.listHeader = data.headers;
    this.dataList = data.data;
    this.listKeys = data.keys;
  }

  ngOnChanges(data) {
    if (data.tableGridData && data.tableGridData.previousValue != undefined) {
      this.initialize(data.tableGridData.currentValue);
    }
  }

  modify(type, item) {
    let result = {};
    result['type'] = type;
    result['data'] = item;
    this.actionEvent.emit(result);
  }

}
