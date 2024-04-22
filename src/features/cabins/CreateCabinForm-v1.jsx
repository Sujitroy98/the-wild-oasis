import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('new Cabin created Successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onErrors(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'this field is required',
            min: { value: 1, message: ' capacity should be atleast 1' },
          })}
        />
      </FormRow>

      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'this field is required',
            min: { value: 1, message: ' amount should be atleast 1' },
          })}
        />
      </FormRow>

      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'this field is required',
            validate: value =>
              Number(value) <= Number(getValues().regularPrice) ||
              'discount must be less than regular Price',
          })}
        />
      </FormRow>

      <FormRow
        label={'Description for website'}
        disabled={isCreating}
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow label={'Cabin photo'}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register('image', {
            required: 'this field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
