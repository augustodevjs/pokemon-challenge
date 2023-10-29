import { FaPen } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, Button, FormPokemonInputModel, Modal, ModalProps, PokemonMapper, PokemonService, PokemonViewModel, ValidationError, pokemonValidator } from "../../../../shared";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { PokemonForm } from "..";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  id?: string;
  setData: Dispatch<SetStateAction<PokemonViewModel[]>>;
};

export const EditPokemonModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  setData,
  id,
}) => {
  const form = useForm<FormPokemonInputModel>({
    mode: 'onChange',
    resolver: yupResolver(pokemonValidator),
  });

  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      if (id) {
        const response = await PokemonService.loadById({ id: Number(id) });
        form.reset(response)
      }
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }, [form, id])

  useEffect(() => {
    loadData()
  }, [id, loadData]);

  const onSuccess = async (data: FormPokemonInputModel) => {
    if (id) {
      const toResponse = PokemonMapper.FormPokemonToUpdatePokemon(data, Number(id));
      const response = await PokemonService.update({ data: toResponse, id: Number(id) });

      const responseMapped = PokemonMapper.FormPokemonUpdateToPokemonViewModel(data, response, Number(id))

      Alert.callSuccess({
        title: 'Produto atualizado com sucesso!',
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((prevData) =>
        prevData.map((client) =>
          client.id === responseMapped.id ? { ...responseMapped } : client,
        ),
      );

      form.reset();
    }
  }

  const onError = (error: unknown) => {
    setIsLoading(false);
    form.reset();

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

  const onSubmit = async (data: FormPokemonInputModel) => {
    setIsLoading(true);
    try {
      await onSuccess(data)
    } catch (error) {
      onError(error)
    }
  };

  const submitButton = (
    <Button
      type="submit"
      disabled={!form.formState.isValid}
      form="edit-pokemon-form"
      variant="primary"
      isLoading={isLoading}
    >
      Salvar
    </Button>
  );

  const modalConfigs: ModalProps = {
    size: 'sm',
    isOpen,
    icon: FaPen,
    onRequestClose,
    title: 'Edição de pokemon',
    actions: [submitButton],
  };

  return (
    <Modal {...modalConfigs}>
      <FormProvider {...form}>
        <PokemonForm id="edit-pokemon-form" onSubmit={onSubmit} />
      </FormProvider>
    </Modal>
  );
};