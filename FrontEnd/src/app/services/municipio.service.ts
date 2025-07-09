import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Municipio } from '../models/municipio.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  //private readonly dataUrl = '/assets/mocks/municipios-mock.json';
  private readonly dataUrl = 'http://localhost:3000/municipios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.dataUrl);
  }

  search(nome: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.dataUrl}/buscar?nome=${nome}`);
  }

  getByMinPop(min: number): Observable<any> {
    return this.http.get(`${this.dataUrl}/populacao/min?min=${min}`);
  }

  getByRange(min: number, max: number|null): Observable<any> {
    if (max === null) {
      return this.http.get(`${this.dataUrl}/populacao/maior?min=${min}`);
    }
    return this.http.get(`${this.dataUrl}/populacao/entre?min=${min}&max=${max}`);
  }

  getCapitaisNaoMaisPopulosas(): Observable<any> {
    return this.http.get(`${this.dataUrl}/capital-nao-populosa`);
  }

  getTop10NaoCapitais(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.dataUrl}/top10-nao-capitais`);
  }

  searchMunicipios(nome: string): Observable<Municipio[]> {
    return new Observable(observer => {
      this.getAll().subscribe(data => {
        const filtrados = data.filter(m => 
          m.nome.toLowerCase().includes(nome.toLowerCase())
        );
        observer.next(filtrados);
        observer.complete();
      });
    });
  }
}
