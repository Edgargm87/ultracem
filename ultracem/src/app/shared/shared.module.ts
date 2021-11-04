import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DatosContactoComponent } from '../components/modals/datos-contacto/datos-contacto.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule],
    exports: [DatosContactoComponent, MatInputModule, MatDialogModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule],
    declarations: [
        DatosContactoComponent
    ],
    entryComponents: [DatosContactoComponent],
    providers: [],
})
export class SharedModule { }
