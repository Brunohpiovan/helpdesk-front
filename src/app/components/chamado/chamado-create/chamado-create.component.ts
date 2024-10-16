import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/service/chamado.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { TecnicoService } from 'src/app/service/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes:Cliente[]=[]
  tecnicos:Tecnico[]=[]


  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService : ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.findAllCliente();
    this.findAllTecnicos();
  }

  create():void{
    this.chamadoService.create(this.chamado).subscribe(reposta=>{
      this.toastService.success('Chamado criado com sucesso!','Novo Chamado');
      this.router.navigate(['chamados']);
    },ex=>{
      this.toastService.error(ex.error.error);
    })
  }


  findAllCliente():void{
    this.clienteService.findAll().subscribe(reposta=>{
      this.clientes = reposta;
    })
  }

  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(reposta=>{
      this.tecnicos = reposta;
    })
  }


  validaCampos():boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid 
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }

}
