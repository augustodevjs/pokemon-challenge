import AsyncSelect from 'react-select/async'
import { Props as ReactSelectProps } from 'react-select'
import { ComponentType, PropsWithChildren } from 'react'
import { ApiConfig, HttpClient, SelectOption } from '../..'
import * as S from './styles'

type WithBaseInputProps = {
  label?: string
  tooltip?: string
  isRequired?: boolean
  error?: string
  required?: boolean
  variant?: 'primary' | 'secondary'
}

type Queries = Record<string, string | number | boolean | undefined>

export type SelectProps = ReactSelectProps<SelectOption | any> &
  WithBaseInputProps

type RemoteSelectProps = SelectProps & {
  apiConfig: ApiConfig
  endpoint?: string
  queries?: Queries
  searchKey?: string
  getOptions?: (body: unknown) => Array<unknown>
}

type Props = PropsWithChildren & {
  isInvalid: boolean
  variant?: string
}

const SelectWrapper: React.FC<Props> = ({ children, isInvalid, variant }) => {
  return <S.Wrapper isInvalid={isInvalid} variant={variant}>{children}</S.Wrapper>
}

const withBaseInput = <T,>(Component: ComponentType<T>) => {
  return (props: T & WithBaseInputProps) => {
    return (
      <>
        {props.label && (
          <label>
            {props.label}
          </label>
        )}
        <Component {...props} />
        {props.error !== undefined && (
          <form className="text-danger">{props.error}</form>
        )}
      </>
    )
  }
}

const RemoteSelect: React.FC<RemoteSelectProps> = ({
  apiConfig,
  endpoint,
  queries = {},
  searchKey = 'nome',
  getOptions,
  getOptionLabel,
  getOptionValue,
  placeholder = 'Selecione aqui',
  error,
  value,
  ...rest
}) => {
  const loadOptions = async (inputValue: string) => {
    const response = await HttpClient.AxiosHttpClient.of(apiConfig).request({
      url: `${endpoint}`,
      method: 'GET',
      params: {
        [searchKey]: inputValue,
        ...queries
      }
    })

    return getOptions ? getOptions(response.body) : response.body
  }

  return (
    <SelectWrapper isInvalid={error !== undefined}>
      <AsyncSelect
        classNamePrefix="select"
        placeholder={placeholder}
        menuPosition="fixed"
        noOptionsMessage={() => 'Nenhum Resultado'}
        loadingMessage={() => 'Buscando...'}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        getOptionLabel={
          getOptionLabel ? getOptionLabel : option => (option as any).nome
        }
        getOptionValue={
          getOptionValue ? getOptionValue : option => (option as any).id
        }
        value={value === undefined ? null : value}
        {...rest}
      />
    </SelectWrapper>
  )
}

export default withBaseInput(RemoteSelect)
