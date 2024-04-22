import { useMutation, useQueryClient } from '@tanstack/react-query';
import {createUpdateCabin} from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(' Cabin edited Successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: err => toast.error(err.message),
  });
  return { updateCabin, isEditing };
}

export default useUpdateCabin;
