import React, { useState } from 'react';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
}

export default function DynamicTable() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive', role: 'User' },
  ]);
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const filteredUsers = sortedUsers.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
          data-testid="user-search"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Email', 'Status', 'Role', 'Actions'].map((header, index) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    if (index < 4) {
                      handleSort(header.toLowerCase() as keyof User);
                    }
                  }}
                  data-testid={`sort-${header.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {index < 4 && <ArrowUpDown className="w-4 h-4" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} data-testid={`user-row-${user.id}`}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      data-testid={`edit-user-${user.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      data-testid={`delete-user-${user.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}