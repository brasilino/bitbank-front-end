import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';

import { ExtractService } from '../extract/extract.service';
import { User } from '../shared/interfaces/user.interface';
import { HistoricTransfer } from './extract.interface';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss']
})
export class ExtractComponent implements OnInit {

  extrato: Array<HistoricTransfer>;
  saldo: Array <User>;
  estaCarregando: boolean;
  page = 1;

  constructor(
    private extractService: ExtractService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.carregarExtrato();
  }

  carregarExtrato() {
    this.estaCarregando = true;
    this.extractService.getExtrato(this.page)
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
