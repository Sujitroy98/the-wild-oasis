import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: id => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('cabin sucessfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return {isDeleting, deleteCabin}
}

export default useDeleteCabin;
