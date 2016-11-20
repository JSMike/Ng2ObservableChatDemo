import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { ChatComponent } from './chat.component';
import { StreamOutDirective } from './stream-out.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ChatComponent,
    StreamOutDirective
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
