import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

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
  loading = false;


  constructor(
    private extractService: ExtractService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadExtract();
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

  loadExtract() {
    this.estaCarregando = true;
    this.extractService.getExtract()
      .subscribe((response) => {
          this.estaCarregando = false;
          this.loading = false;
          this.extrato = response;
          this.listExtract = this.extrato;
        }, error => {
          this.loading = false;
          if (error.status === 400) {
            alert(error.error.message);
          }
        });
  }

  irParaDetalhes(idTransacao: string) {
    // this.router.navigate(['extrato/transacoes/', idTransacao]);
    this.router.navigate([`extrato/transacoes/${idTransacao}`]);
  }

  proximaPagina() {
    this.page = this.page + 1;
    this.loadExtract();
  }

  paginaAnterior() {
    this.page = this.page - 1;
    this.loadExtract();
  }

}
