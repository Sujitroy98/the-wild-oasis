import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createUpdateCabin } from '../../services/apiCabins';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success('new Cabin created Successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message),
  });

  return { isCreating, createCabin };
}

export default useCreateCabin;
