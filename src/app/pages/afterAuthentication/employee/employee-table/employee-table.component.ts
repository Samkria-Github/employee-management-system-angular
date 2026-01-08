import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'employee-management-employee-table',
  imports: [ButtonModule, RouterModule, TableModule, IconFieldModule, InputTextModule, InputIconModule, SearchComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
users = [
  {
    id: '#101',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    department: 'IT',
    imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '#102',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    department: 'Finance',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '#103',
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    department: 'HR',
    imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: '#104',
    name: 'David Brown',
    email: 'david.brown@example.com',
    department:  'IT',
    imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  {
    id: '#105',
    name: 'Eva Miller',
    email: 'eva.miller@example.com',
    department: 'Finance',
    imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  {
    id: '#106',
    name: 'Frank Wilson',
    email: 'frank.wilson@example.com',
    department: 'Sales',
    imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg'
  }
];
}
