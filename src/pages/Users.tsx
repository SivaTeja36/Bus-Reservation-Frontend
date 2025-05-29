// Users.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { createUser, getBranches, getUsers } from '../api/services';
import { UserCreationRequest } from '../types';
import Modal from '../components/Modal';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UserCreationRequest>();

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await getUsers();
      return response.data.data;
    },
  });

  const { data: branches } = useQuery({
    queryKey: ['branches'],
    queryFn: async () => {
      const response = await getBranches();
      return response.data.data;
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
      setIsModalOpen(false);
      reset();
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });

  const onSubmit = (data: UserCreationRequest) => {
    createUserMutation.mutate(data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} />
          Create User
        </button>
      </div>

      {isLoading && <div>Loading users...</div>}
      {isError && <div>Failed to load users.</div>}
      {users && (
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left border-b">Name</th>
              <th className="py-2 px-4 text-left border-b">Email</th>
              <th className="py-2 px-4 text-left border-b">Role</th>
              <th className="py-2 px-4 text-left border-b">Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{user.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create User"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register('name', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter email"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter password"
              type="password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              {...register('role', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter role"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              {...register('contact', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter contact"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              {...register('branch_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              defaultValue=""
            >
              <option value="" disabled>
                Select branch
              </option>
              {branches &&
                branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.city}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
