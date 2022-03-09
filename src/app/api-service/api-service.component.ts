import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-api-service',
  templateUrl: './api-service.component.html',
  styleUrls: ['./api-service.component.css']
})
export class ApiServiceComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
  public fetchData() {
     let url="../../assets/drug1.json"
     let url2="../../assets/drug2.json"

    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
    };
    return this.httpClient.get<any>(url);
  }
}
