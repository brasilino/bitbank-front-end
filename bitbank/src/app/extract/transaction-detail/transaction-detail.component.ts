import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

import { HistoricTransfer } from '../extract.interface';
import { ExtractService } from '../extract.service';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  transacao: HistoricTransfer;
  estaCarregando: boolean;

  constructor(
    private route: ActivatedRoute,
    private extractService: ExtractService,
  ) { }

  ngOnInit() {
    const idTransacao = this.route.snapshot.paramMap.get('idTransacao');
    this.getHistoricTransferPorId(idTransacao);
  }

  getHistoricTransferPorId(idTransacao) {
    this.estaCarregando = true;
    this.extractService.getHistoricTransferPorId(idTransacao)
      .pipe(
        delay(2000),
      )
      .subscribe(response => {
        this.transacao = response;
        this.estaCarregando = false;
      });
  }

}

