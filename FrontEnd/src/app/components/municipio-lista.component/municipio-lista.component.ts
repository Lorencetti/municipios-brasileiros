import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { Municipio } from '../../models/municipio.model';
import { MunicipioService } from '../../services/municipio.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-municipio-lista',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatSortModule, ReactiveFormsModule],
  templateUrl: './municipio-lista.component.html',
  styleUrls: ['./municipio-lista.component.scss'],
  standalone: true
})

export class MunicipioListaComponent {

  loadMunicipios() {
    this.municipioService.getAll().subscribe((municipios: Municipio[]) => {
      this.dataSource.data = municipios;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor() {
    this.loadMunicipios();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInputModule) input!: MatInputModule;

  searchTermMunicipio = new FormControl('');
  searchTermEstado = new FormControl('');
  minPopControl = new FormControl('');
  maxPopControl = new FormControl('');
  displayedColumns: string[] = ['nome', 'estado', 'populacao', 'capital'];
  dataSource = new MatTableDataSource<Municipio>();

  private municipioService = inject(MunicipioService);
  filterMunicipios() {
    this.loadMunicipios(); // Importante resetar a lista antes de filtrar, caso esteja filtrada previamente
    if (!this.searchTermMunicipio.value) {
      return;
    }
    const filterValue = this.searchTermMunicipio.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  filterEstados() {
    const sigla = this.searchTermEstado.value?.trim().toUpperCase();
    this.loadMunicipios(); // Importante resetar a lista antes de filtrar, caso esteja filtrada previamente
    if (!sigla) {
      return;
    }
    this.dataSource.data = this.dataSource.data.filter(m => m.estado.toUpperCase() === sigla);
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  filterBetweenPopulacao() {
    const min = Number(this.minPopControl.value) || 0;
    const max = Number(this.maxPopControl.value) || null;
    if (!this.minPopControl.value && !this.maxPopControl.value) {
      this.loadMunicipios();
      return;
    }
    if (max !== null && min > max) {
      alert('O valor mínimo não pode ser maior que o máximo.');
      return;
    }
    if (max === null) {
      this.municipioService.getByMinPop(min).subscribe((municipios: Municipio[]) => {
        this.dataSource.data = municipios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(min,municipios);
      });
      return;
    }
    this.municipioService.getByRange(min, max).subscribe((municipios: Municipio[]) => {
      this.dataSource.data = municipios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(min,max,municipios);
    });
  }

  buscarCapitaisNaoMaisPop() {
    this.municipioService.getCapitaisNaoMaisPopulosas().subscribe((municipios: Municipio[]) => {
      this.dataSource.data = municipios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(municipios);
    });
  }

  buscarTop10() {
    this.municipioService.getTop10NaoCapitais().subscribe((municipios: Municipio[]) => {
      this.dataSource.data = municipios;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(municipios);
    });
  }
}
