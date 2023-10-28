import { FaTrash } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert, ConfirmModal, ConfirmModalProps, ModalProps, PokemonService, PokemonViewModel, ValidationError } from "../../../../shared";

type Props = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  name?: string;
  id?: string;
  setData: Dispatch<SetStateAction<PokemonViewModel[]>>;
};

export const RemovePokemonModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  name,
  id,
  setData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = async () => {
    if (id) {
      await PokemonService.remove({ id });

      Alert.callSuccess({
        title: `Pokemon removido com sucesso!`,
        onConfirm: onRequestClose,
      });

      setIsLoading(false);

      setData((data) => data.filter((list) => list.id !== Number(id)));
    }
  }

  const onError = (error: unknown) => {
    setIsLoading(false);

    if (error instanceof ValidationError) {
      Alert.callError({
        title: (error as Error).name,
        description: error.errors[0],
        onConfirm: onRequestClose
      });
    } else {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  };

  const onConfirm = async () => {
    setIsLoading(true)

    try {
      await onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  const modalConfigs: ConfirmModalProps = {
    isOpen,
    onRequestClose,
    onConfirm,
    title: 'Remoção do pokemon',
    icon: FaTrash,
    size: 'sm',
    message: `Tem certeza de que deseja excluir o pokemon ${name}?`,
    isLoading: isLoading,
  };

  return <ConfirmModal {...modalConfigs} />;
};
