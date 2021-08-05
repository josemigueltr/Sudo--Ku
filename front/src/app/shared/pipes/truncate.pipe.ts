import { Pipe, PipeTransform } from '@angular/core';
/*
 * Corta un texto largo a una longitud dada
 * y agrega puntos suspensivos (...) al final
 * Usage:
 *   value | truncate:length
 * Example:
 *   {{ 'Este es un texto largo' | truncate:10 }}
 *   formats to: Este es un...
*/
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number): string {
    return value.substr(0, length) + '...'
  }

}
