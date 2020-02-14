import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';

import { ExtractService } from '../extract/extract.service';
import { User } from '../shared/interfaces/user.interface';
import { Extract } from './extract.interface';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  extrato: Array<Extract>;
  listExtract: Array<Extract>;
  saldo: Array <User>;
  estaCarregando: boolean;
  page = 1;


  constructor(
    private extractService: ExtractService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.carregarExtrato();
    this.extrato = [
      {
          "transctionId": "5e4328280230af4be879cfec",
          "transactionDate": "2020-02-11T22:18:16.971Z",
          "_id": "5e4328280230af4be879cfeb",
          "cpfUser": "327.355.380-44",
          "amountTransferred": -3000
      },
      {
          "transctionId": "5e432cf1211df32acc54ecd3",
          "transactionDate": "2020-02-11T22:38:41.119Z",
          "_id": "5e432cf1211df32acc54ecd2",
          "cpfUser": "327.355.380-44",
          "amountTransferred": -3000
      },
      {
          "transctionId": "5e432d1c01c2733250537c24",
          "transactionDate": "2020-02-11T22:39:24.205Z",
          "_id": "5e432d1c01c2733250537c23",
          "cpfUser": "327.355.380-44",
          "amountTransferred": -3000
      },
      {
          "transctionId": "5e4345c00631e13758a94756",
          "transactionDate": "2020-02-12T00:24:32.828Z",
          "_id": "5e4345c00631e13758a94755",
          "cpfUser": "327.355.380-44",
          "amountTransferred": -5000
      },
      {
          "transctionId": "5e45f0b9811d8c03dc6fe0c9",
          "transactionDate": "2020-02-14T00:58:33.206Z",
          "_id": "5e45f0b9811d8c03dc6fe0c8",
          "cpfUser": "425.919.208-69",
          "amountTransferred": 1000
      }
    ];
    this.listExtract = this.extrato;
  }

  onSelectedTabChange(tabChanceEvent: MatTabChangeEvent){
    if (tabChanceEvent.index === 0) {
      this.listExtract = this.extrato;
    } else if (tabChanceEvent.index === 1) {
      this.filterInputExtract();
    } else if (tabChanceEvent.index === 2) {
      this.filterOutputExtract();
    }
  }

  filterInputExtract() {
    let filter = [];
    filter = this.extrato.filter((currentValue) => {
      if (currentValue.amountTransferred >= 0 ) {
        return currentValue;
      }
    });
    this.listExtract = filter;
  }

  filterOutputExtract() {
    let filter = [];
    filter = this.extrato.filter((currentValue) => {
      if (currentValue.amountTransferred < 0 ) {
        return currentValue;
      }
    });
    this.listExtract = filter;
  }

  

  selectedTabChange(){
    console.log('passou aqui');
  }

  carregarExtrato() {
    this.estaCarregando = true;
    this.extractService.getExtractPage(this.page)
      .pipe(
        // tap(resposta => console.log('passoiu por aqui')),
        // delay(2000),
        take(1),
        finalize(() => {
          this.estaCarregando = false;
        }),
      )
      .subscribe(response => {
        this.extrato = response;
      });
  }

  irParaDetalhes(idTransacao: string) {
    // this.router.navigate(['extrato/transacoes/', idTransacao]);
    this.router.navigate([`extrato/transacoes/${idTransacao}`]);
  }

  proximaPagina() {
    this.page = this.page + 1;
    this.carregarExtrato();
  }

  paginaAnterior() {
    this.page = this.page - 1;
    this.carregarExtrato();
  }

}
