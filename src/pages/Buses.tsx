import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getBuses, createBus, getCompanies } from '../api/services';
import { BusRequest } from '../types';
import Table from '../components/Table';
import Modal from '../components/Modal';

const Buses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<BusRequest>();

  const { data: buses, isLoading: busesLoading } = useQuery({
    queryKey: ['buses'],
    queryFn: async () => {
      const response = await getBuses();
      return response.data.data;
    },
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await getCompanies();
      return response.data.data;
    },
  });

  const createBusMutation = useMutation({
    mutationFn: createBus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buses'] });
      toast.success('Bus created successfully');
      setIsModalOpen(false);
      reset();
    },
    onError: () => {
      toast.error('Failed to create bus');
    },
  });

  const columns = [
    { header: 'Bus Number', accessor: 'bus_number' },
    { header: 'Type', accessor: 'bus_type' },
    { header: 'Total Seats', accessor: 'total_seats' },
    { header: 'Company', accessor: (bus) => bus.company_data.name },
    { header: 'Status', accessor: (bus) => bus.is_active ? 'Active' : 'Inactive' },
  ];

  if (busesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Create Bus
        </button>
      </div>

      <Table data={buses || []} columns={columns} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Bus"
      >
        <form onSubmit={handleSubmit((data) => createBusMutation.mutate(data))}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <select
                {...register('company_id', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Select a company</option>
                {companies?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bus Number
              </label>
              <input
                type="text"
                {...register('bus_number')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bus Type
              </label>
              <select
                {...register('bus_type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="AC">AC</option>
                <option value="NON_AC">NON AC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Seats
              </label>
              <input
                type="number"
                {...register('total_seats', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Buses;