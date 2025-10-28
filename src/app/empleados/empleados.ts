import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../services/empleado';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.scss'
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  nuevoEmpleado: any = {
    nombre: '',
    apellido: '',
    correo: '',
    salario: 0
  };
  mensaje: string = '';

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.listaEmpleados().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // ← Agregar esto para debug
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados:', error);
        this.mensaje = 'Error al cargar empleados';
      }
    );
  }

  crearEmpleado(): void {
    console.log('Creando empleado:', this.nuevoEmpleado); // ← Debug
    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        this.mensaje = 'Empleado creado exitosamente';
        this.cargarEmpleados();
        this.limpiarFormulario();
      },
      (error) => {
        console.error('Error al crear empleado:', error);
        this.mensaje = 'Error al crear empleado';
      }
    );
  }

  limpiarFormulario(): void {
    this.nuevoEmpleado = {
      nombre: '',
      apellido: '',
      correo: '',
      salario: 0
    };
  }
}