import {
  MatButtonModule,
  MatCheckboxModule,
  MatLabel,
  MatHint,
  MatFormField,
  MatFormFieldModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCarouselModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCarouselModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
