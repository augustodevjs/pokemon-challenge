import AsyncSelect from 'react-select/async'
import { HttpClient, RemoteSelectProps, SelectWrapper, withBaseInput } from '../..'

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
