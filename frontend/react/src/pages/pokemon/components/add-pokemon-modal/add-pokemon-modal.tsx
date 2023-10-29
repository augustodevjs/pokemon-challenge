import { PokemonForm } from "..";
import { FaPlus } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Button, FormPokemonAddInputModel, Modal, ModalProps, PokemonMapper, PokemonService, PokemonViewModel, ValidationError, pokemonValidator } from "../../../../shared";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  setData: Dispatch<SetStateAction<PokemonViewModel[]>>;
};

export const AddPokemonModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormPokemonAddInputModel>({
    mode: 'onChange',
    resolver: yupResolver(pokemonValidator),
  });

  const submitButton = (
    <Button
      type="submit"
      // disabled={!form.formState.isValid}
      form="add-pokemon-form"
      variant="primary"
      isLoading={isLoading}
    >
      Salvar
    </Button>
  );

  const onSuccess = async (data: FormPokemonAddInputModel) => {
    const toResponse = PokemonMapper.FormPokemonToAddPokemon(data);
    const response = await PokemonService.add({ data: toResponse });

    Alert.callSuccess({
      title: 'Pokemon cadastrado',
      onConfirm: onRequestClose,
    });

    setIsLoading(false);
    form.reset();

    setData((prevData) => [...prevData, PokemonMapper.FormPokemonAddToPokemonViewModel(response, data)]);
  }

  const onError = (error: unknown) => {
    setIsLoading(false);
    form.reset()

    if (error instanceof ValidationError) {
      Alert.callError({
        title: (error as Error).name,
        description: error.errors[0],
      });
    } else {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  const onSubmit: SubmitHandler<FormPokemonAddInputModel> = async (data) => {
    setIsLoading(true);

    try {
      await onSuccess(data)
    } catch (error) {
      onError(error)
    }
  };

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPlus,
    onRequestClose,
    title: 'Cadastro de pokemon',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <PokemonForm id="add-pokemon-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};
