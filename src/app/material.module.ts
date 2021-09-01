import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';

@NgModule({
  exports: [
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
