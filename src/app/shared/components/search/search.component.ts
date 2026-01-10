/**
 * SearchComponent - Reusable search input component
 * Features: Input field with search icon, emits keyup events, supports initial value
 * husky: git add . && git commit -m "feat: search component with event emission"
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'employee-management-search',
  imports: [IconFieldModule, InputTextModule, InputIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  // Input binding for initial search value
  @Input() initialSearchValue: string | null = null;
  
  // Local search text state
  protected searchText = '';
  
  // Output event for parent component handling
  @Output() searchKeyup = new EventEmitter<KeyboardEvent>();

  /**
   * Initialize component with optional pre-filled search value
   * husky: Sets initial search text from parent input
   */
  ngOnInit(): void {
    if (this.initialSearchValue) {
      this.searchText = this.initialSearchValue; 
    }
  }

  /**
   * Handle keyup events and emit to parent
   * husky: Passes KeyboardEvent and current input value to parent search handler
   */
  onKeyup(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.searchKeyup.emit(event);
  }
}
